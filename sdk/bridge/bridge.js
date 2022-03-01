import { ChainId } from "../common/chainid.js";
import { Networks } from "../common/networks.js";
import { contractAddressFor, executePopulatedTransaction, rejectPromise, } from "../common/utils.js";
import { SwapType } from "../internal/swaptype.js";
import { newProviderForNetwork } from "../internal/rpcproviders.js";
import { Tokens } from "../tokens.js";
import { SwapPools } from "../swappools.js";
import { TokenSwap } from "../tokenswap.js";
import { SynapseEntities } from "../entities.js";
import { BaseToken, WrappedToken } from "../token.js";
import { Zero } from "@ethersproject/constants";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { ERC20, MAX_APPROVAL_AMOUNT } from "./erc20.js";
import { BridgeUtils } from "./bridgeutils.js";
import { GasUtils } from "./gasutils.js";
/**
 * Bridge provides a wrapper around common Synapse Bridge interactions, such as output estimation, checking supported swaps/bridges,
 * and most importantly, executing Bridge transactions.
 */
export var Bridge;
(function (Bridge) {
    /**
     * SynapseBridge is a wrapper around any Synapse Bridge contract which exists on chains supported by the Synapse Protocol.
     */
    class SynapseBridge {
        network;
        chainId;
        provider;
        bridgeAddress;
        bridgeInstance;
        networkZapBridgeInstance;
        isL2Zap;
        zapBridgeAddress;
        bridgeConfigInstance = SynapseEntities.bridgeConfig();
        zapBridgeInstance = SynapseEntities.l1BridgeZap({
            chainId: ChainId.ETH,
            signerOrProvider: newProviderForNetwork(ChainId.ETH),
        });
        requiredConfirmations;
        constructor(args) {
            let { network, provider } = args;
            this.network = network instanceof Networks.Network ? network : Networks.fromChainId(network);
            this.chainId = this.network.chainId;
            this.provider = provider ?? newProviderForNetwork(this.chainId);
            this.requiredConfirmations = getRequiredConfirmationsForBridge(this.network);
            this.isL2Zap = this.network.zapIsL2BridgeZap;
            let factoryParams = { chainId: this.chainId, signerOrProvider: this.provider };
            this.bridgeInstance = SynapseEntities.synapseBridge(factoryParams);
            this.bridgeAddress = contractAddressFor(this.chainId, "bridge");
            this.networkZapBridgeInstance = SynapseEntities.zapBridge({ chainId: this.chainId, signerOrProvider: this.provider });
            this.zapBridgeAddress = this.networkZapBridgeInstance.address;
        }
        bridgeVersion() {
            return this.bridgeInstance.bridgeVersion();
        }
        WETH_ADDRESS() {
            return this.bridgeInstance.WETH_ADDRESS();
        }
        /**
         * Returns whether a swap/bridge from this Bridge's chain to another chain between two tokens
         * is supported.
         * @param {BaseToken} args.tokenFrom {@link Token} user will send to the bridge
         * @param {BaseToken} args.tokenTo {@link Token} user will receive from the bridge on the destination chain
         * @param {number} args.chainIdTo Chain ID of the destination chain
         * @return boolean value denoting whether the input params constitute a valid swap/bridge, along with a
         * string value denoting the reason for an unsupported swap, if applicable.
         */
        swapSupported(args) {
            const { swapSupported, reasonNotSupported } = TokenSwap.bridgeSwapSupported({ ...args, chainIdFrom: this.chainId });
            return [swapSupported, reasonNotSupported?.reason || ""];
        }
        /**
         * Returns the estimated output of a given token on the destination chain were a user to send
         * some amount of another given token on the source chain.
         * @param {BridgeParams} args Parameters for the output estimation.
         * @return {Promise<BridgeOutputEstimate>} Object containing the estimated output of args.tokenTo, as well
         * as the estimated fee to be taken by the bridge. Note that the estimated output already accounts for the
         * bridge fee, so the bridge fee is entirely for user-facing purposes. Do not use it for calculations.
         */
        async estimateBridgeTokenOutput(args) {
            try {
                await this.checkSwapSupported(args);
            }
            catch (e) {
                return rejectPromise(e);
            }
            return this.calculateBridgeRate(args);
        }
        /**
         * Returns a populated transaction for initiating a token bridge between this Bridge (the source chain) and the bridge contract on the destination chain.
         * Note that this function **does not** send a signed transaction.
         * @param {BridgeTransactionParams} args Parameters for the bridge transaction
         * @return {Promise<PopulatedTransaction>} Populated transaction instance which can be sent via ones choice
         * of web3/ethers/etc.
         */
        async buildBridgeTokenTransaction(args) {
            const { addressTo } = args, tokenArgs = this.makeBridgeTokenArgs(args), { tokenFrom, tokenTo } = tokenArgs;
            if ((!addressTo) || addressTo === "") {
                return rejectPromise(new Error("BridgeTransactionParams.addressTo cannot be empty string or undefined"));
            }
            args = { ...args, tokenFrom, tokenTo };
            let newTxn = this.chainId === ChainId.ETH
                ? this.buildETHMainnetBridgeTxn(args, tokenArgs)
                : this.buildL2BridgeTxn(args, tokenArgs);
            return newTxn
                .then((txn) => GasUtils.populateGasParams(this.chainId, txn, "bridge"))
                .catch(rejectPromise);
        }
        /**
         * Starts the Bridge process between this Bridge (the source chain) and the bridge contract on the destination chain.
         * Note that this function **does** send a signed transaction.
         * @param {BridgeTransactionParams} args Parameters for the bridge transaction.
         * @param {Signer} signer Some instance which implements the Ethersjs {@link Signer} interface.
         * @return {Promise<ContractTransaction>}
         */
        async executeBridgeTokenTransaction(args, signer) {
            try {
                await this.checkSwapSupported(args);
            }
            catch (e) {
                return rejectPromise(e);
            }
            const { tokenFrom, amountFrom, addressTo } = args, signerAddress = await signer.getAddress();
            args.addressTo = addressTo ?? signerAddress;
            return this.checkCanBridge({
                address: signerAddress,
                token: tokenFrom,
                amount: amountFrom,
            })
                .then((canBridgeRes) => {
                const [canBridge, err] = canBridgeRes;
                if (!canBridge) {
                    return rejectPromise(err);
                }
                let txnProm = this.buildBridgeTokenTransaction(args);
                return executePopulatedTransaction(txnProm, signer);
            })
                .catch(rejectPromise);
        }
        /**
         * Builds an ethers PopulatedTransaction instance for an ERC20 Approve call,
         * approving some amount of a given token to be spent by the Synapse Bridge on its chain.
         * The returned PopulatedTransaction must then be passed to the user via Web3 or some other
         * framework so they can ultimately send the transaction.
         * Should ALWAYS be called before performing any bridge transactions to ensure they don't fail.
         * @param {Object} args
         * @param {BaseToken|string} args.token {@link BaseToken} instance or valid on-chain address of the token the user will be sending
         * to the bridge on the source chain.
         * @param {BigNumberish} args.amount Optional, a specific amount of args.token to approve. By default, this function
         * builds an Approve call using an "infinite" approval amount.
         * @return {Promise<PopulatedTransaction>} Populated transaction instance which can be sent via ones choice
         * of web3/ethers/etc.
         */
        async buildApproveTransaction(args) {
            const [approveArgs, tokenAddress] = this.buildERC20ApproveArgs(args);
            return ERC20.buildApproveTransaction(approveArgs, { tokenAddress, chainId: this.chainId });
        }
        /**
         * Builds and executes an ERC20 Approve call,
         * approving some amount of a given token to be spent by the Synapse Bridge on its chain.
         * The returned PopulatedTransaction must then be passed to the user via Web3 or some other
         * framework so they can ultimately send the transaction.
         * Should ALWAYS be called before performing any bridge transactions to ensure they don't fail.
         * @param {Object} args
         * @param {BaseToken|string} args.token {@link BaseToken} instance or valid on-chain address of the token the user will be sending
         * to the bridge on the source chain.
         * @param {BigNumberish} args.amount Optional, a specific amount of args.token to approve. By default, this function
         * @param {Signer} signer Valid ethers Signer instance for building a fully and properly populated
         * transaction.
         */
        async executeApproveTransaction(args, signer) {
            const [approveArgs, tokenAddress] = this.buildERC20ApproveArgs(args);
            return Promise.resolve(ERC20.approve(approveArgs, { tokenAddress, chainId: this.chainId }, signer)
                .then((res) => res));
        }
        async getAllowanceForAddress(args) {
            let { address, token } = args;
            let tokenAddress = token.address(this.chainId);
            return ERC20.allowanceOf(address, this.zapBridgeAddress, { tokenAddress, chainId: this.chainId });
        }
        async checkNeedsApprove(args) {
            let { amount } = args;
            amount = amount ?? MAX_APPROVAL_AMOUNT.sub(1);
            const { address } = args;
            const [{ spender }, tokenAddress] = this.buildERC20ApproveArgs(args);
            return ERC20.allowanceOf(address, spender, { tokenAddress, chainId: this.chainId })
                .then((allowance) => {
                const res = [allowance.lt(amount), allowance];
                return res;
            })
                .catch(rejectPromise);
        }
        async checkHasBalance(args) {
            const { address, amount } = args, [, tokenAddress] = this.buildERC20ApproveArgs(args);
            return ERC20.balanceOf(address, { tokenAddress, chainId: this.chainId })
                .then((balance) => {
                const res = [balance.gte(amount), balance];
                return res;
            })
                .catch(rejectPromise);
        }
        async checkCanBridge(args) {
            const { token } = args;
            const hasBalanceRes = this.checkHasBalance(args)
                .then((balanceRes) => {
                const [hasBalance, balance] = balanceRes;
                if (!hasBalance) {
                    let balanceEth = formatUnits(balance, token.decimals(this.chainId)).toString();
                    let ret = [false, new Error(`Balance of token ${token.symbol} is too low; current balance is ${balanceEth}`)];
                    return ret;
                }
                let ret = [true, null];
                return ret;
            })
                .catch(rejectPromise);
            return this.checkNeedsApprove(args)
                .then((approveRes) => {
                const [needsApprove, allowance] = approveRes;
                if (needsApprove) {
                    let allowanceEth = formatUnits(allowance, token.decimals(this.chainId)).toString();
                    let ret = [false, new Error(`Spend allowance of Bridge too low for token ${token.symbol}; current allowance for Bridge is ${allowanceEth}`)];
                    return ret;
                }
                return hasBalanceRes;
            })
                .catch(rejectPromise);
        }
        buildERC20ApproveArgs(args) {
            const { token, amount } = args;
            let tokenAddr = (token instanceof BaseToken) || (token instanceof WrappedToken)
                ? token.address(this.chainId)
                : token;
            return [{
                    spender: this.zapBridgeAddress,
                    amount
                }, tokenAddr];
        }
        async checkSwapSupported(args) {
            return new Promise((resolve, reject) => {
                let [swapSupported, errReason] = this.swapSupported(args);
                if (!swapSupported) {
                    reject(errReason);
                    return;
                }
                resolve(true);
            });
        }
        async calculateBridgeRate(args) {
            let { chainIdTo, amountFrom } = args;
            const toChainZapParams = { chainId: chainIdTo, signerOrProvider: newProviderForNetwork(chainIdTo) };
            const toChainZap = SynapseEntities.zapBridge(toChainZapParams);
            const { tokenFrom, tokenTo, tokenIndexFrom, tokenIndexTo, fromChainTokens } = this.makeBridgeTokenArgs(args);
            let { intermediateToken, bridgeConfigIntermediateToken } = TokenSwap.intermediateTokens(chainIdTo, tokenFrom);
            const bigNumTen = BigNumber.from(10);
            const bridgeFeeRequest = this.bridgeConfigInstance.calculateSwapFee(bridgeConfigIntermediateToken.address(chainIdTo), chainIdTo, amountFrom.mul(bigNumTen.pow(18 - tokenFrom.decimals(this.chainId))));
            const checkEthy = (c, t) => BridgeUtils.isL2ETHChain(c) && t.swapType === SwapType.ETH;
            const ethToEth = this.chainId === ChainId.ETH && checkEthy(chainIdTo, tokenTo), ethFromEth = chainIdTo === ChainId.ETH && checkEthy(this.chainId, tokenFrom);
            let amountToReceive_from;
            switch (true) {
                case amountFrom.eq(Zero):
                    amountToReceive_from = Zero;
                    break;
                case ethToEth:
                case Tokens.isMintBurnToken(tokenFrom):
                case tokenFrom.isWrappedToken:
                    amountToReceive_from = amountFrom;
                    break;
                case this.chainId === ChainId.ETH:
                    let liquidityAmounts = fromChainTokens.map((t) => tokenFrom.isEqual(t) ? amountFrom : Zero);
                    amountToReceive_from = await this.zapBridgeInstance.calculateTokenAmount(liquidityAmounts, true);
                    break;
                default:
                    amountToReceive_from = await BridgeUtils.calculateSwapL2Zap(this.networkZapBridgeInstance, intermediateToken.address(this.chainId), tokenIndexFrom, 0, amountFrom);
            }
            let bridgeFee;
            try {
                bridgeFee = await bridgeFeeRequest;
            }
            catch (e) {
                console.error(`Error in bridge fee request: ${e}`);
                return null;
            }
            amountToReceive_from = BridgeUtils.subBigNumSafe(amountToReceive_from, bridgeFee);
            let amountToReceive_to;
            switch (true) {
                case amountToReceive_from.isZero():
                    amountToReceive_to = Zero;
                    break;
                case ethFromEth:
                case Tokens.isMintBurnToken(tokenTo):
                case tokenTo.isWrappedToken:
                    amountToReceive_to = amountToReceive_from;
                    break;
                case chainIdTo === ChainId.ETH:
                    amountToReceive_to = await toChainZap
                        .calculateRemoveLiquidityOneToken(amountToReceive_from, tokenIndexTo);
                    break;
                default:
                    amountToReceive_to = await BridgeUtils.calculateSwapL2Zap(toChainZap, intermediateToken.address(chainIdTo), 0, tokenIndexTo, amountToReceive_from);
            }
            let amountToReceive = amountToReceive_to;
            return { amountToReceive, bridgeFee };
        }
        checkEasyArgs(args, zapBridge, easyDeposits, easyRedeems, easyDepositETH) {
            let castArgs = args;
            if (easyRedeems.includes(args.tokenTo.hash)) {
                return {
                    castArgs,
                    isEasy: true,
                    txn: zapBridge.populateTransaction.redeem(...BridgeUtils.makeEasyParams(castArgs, this.chainId, args.tokenTo))
                };
            }
            else if (easyDeposits.includes(args.tokenTo.hash)) {
                return {
                    castArgs,
                    isEasy: true,
                    txn: zapBridge.populateTransaction.deposit(...BridgeUtils.makeEasyParams(castArgs, this.chainId, args.tokenTo))
                };
            }
            else if (easyDepositETH.includes(args.tokenTo.hash)) {
                return {
                    castArgs,
                    isEasy: true,
                    txn: zapBridge.populateTransaction.depositETH(...BridgeUtils.depositETHParams(castArgs), { value: args.amountFrom })
                };
            }
            return { castArgs, isEasy: false };
        }
        buildETHMainnetBridgeTxn(args, tokenArgs) {
            const { addressTo, chainIdTo, amountFrom, amountTo } = args, zapBridge = SynapseEntities.l1BridgeZap({
                chainId: this.chainId,
                signerOrProvider: this.provider
            });
            let easyRedeems = [Tokens.SYN.hash], easyDeposits = [Tokens.HIGH.hash, Tokens.DOG.hash, Tokens.FRAX.hash], easyDepositETH = [Tokens.NETH.hash];
            if (args.tokenFrom.isEqual(Tokens.NUSD)) {
                easyDeposits.push(Tokens.NUSD.hash);
            }
            let { castArgs, isEasy, txn } = this.checkEasyArgs(args, zapBridge, easyDeposits, easyRedeems, easyDepositETH);
            if (isEasy && txn) {
                return txn;
            }
            const { transactionDeadline, bridgeTransactionDeadline, minToSwapDestFromOrigin, minToSwapDest, minToSwapOriginMediumSlippage, minToSwapDestFromOriginMediumSlippage, } = BridgeUtils.getSlippages(amountFrom, amountTo);
            switch (args.tokenTo.hash) {
                case Tokens.NUSD.hash:
                    if (!args.tokenFrom.isEqual(Tokens.NUSD)) {
                        const liquidityAmounts = tokenArgs.fromChainTokens.map((t) => {
                            return args.tokenFrom.isEqual(t) ? amountFrom : Zero;
                        });
                        return zapBridge.populateTransaction.zapAndDeposit(addressTo, chainIdTo, Tokens.NUSD.address(this.chainId), liquidityAmounts, minToSwapDest, transactionDeadline);
                    }
                    break;
                default:
                    if (BridgeUtils.isETHLikeToken(args.tokenTo) || args.tokenTo.isEqual(Tokens.WETH)) {
                        return zapBridge.populateTransaction.depositETHAndSwap(...BridgeUtils.depositETHParams(castArgs), 0, // nusd tokenindex,
                        tokenArgs.tokenIndexTo, minToSwapDestFromOrigin, // minDy
                        bridgeTransactionDeadline, { value: amountFrom });
                    }
                    const liquidityAmounts = tokenArgs.fromChainTokens.map((t) => {
                        return args.tokenFrom.isEqual(t) ? amountFrom : Zero;
                    });
                    return zapBridge.populateTransaction.zapAndDepositAndSwap(addressTo, chainIdTo, Tokens.NUSD.address(this.chainId), liquidityAmounts, minToSwapOriginMediumSlippage, // minToSwapOrigin,
                    transactionDeadline, 0, tokenArgs.tokenIndexTo, minToSwapDestFromOriginMediumSlippage, //, minToSwapDestFromOrigin, // minDy
                    bridgeTransactionDeadline);
            }
        }
        buildL2BridgeTxn(args, tokenArgs) {
            const { chainIdTo, amountFrom, amountTo } = args, zapBridge = SynapseEntities.l2BridgeZap({
                chainId: this.chainId,
                signerOrProvider: this.provider
            });
            if (tokenArgs.tokenFrom.isEqual(Tokens.AVWETH)) {
                tokenArgs.tokenFrom = Tokens.WETH_E;
            }
            let easyDeposits = [], easyRedeems = [Tokens.SYN.hash, Tokens.HIGH.hash, Tokens.DOG.hash, Tokens.FRAX.hash], easyDepositETH = [];
            if (args.tokenFrom.isEqual(Tokens.NUSD)) {
                easyRedeems.push(Tokens.NUSD.hash);
            }
            BridgeUtils.DepositIfChainTokens.forEach((args) => {
                let { chainId, tokens, depositEth, altChainId } = args;
                let hasAltChain = typeof altChainId !== 'undefined', tokenHashes = tokens.map((t) => t.hash);
                if (this.chainId === chainId) {
                    depositEth
                        ? easyDepositETH.push(...tokenHashes)
                        : easyDeposits.push(...tokenHashes);
                }
                else {
                    if (hasAltChain) {
                        if (this.chainId === altChainId)
                            easyRedeems.push(...tokenHashes);
                    }
                    else {
                        easyRedeems.push(...tokenHashes);
                    }
                }
            });
            let { castArgs, isEasy, txn } = this.checkEasyArgs(args, zapBridge, easyDeposits, easyRedeems, easyDepositETH);
            if (isEasy && txn) {
                return txn;
            }
            const { transactionDeadline, bridgeTransactionDeadline, minToSwapOriginHighSlippage, minToSwapDestFromOriginHighSlippage, minToSwapDest, } = BridgeUtils.getSlippages(amountFrom, amountTo);
            const easyRedeemAndSwap = (baseToken) => zapBridge.populateTransaction.redeemAndSwap(...BridgeUtils.makeEasyParams(castArgs, this.chainId, baseToken), 0, tokenArgs.tokenIndexTo, minToSwapDest, transactionDeadline);
            const easySwapAndRedeemAndSwap = (baseToken, withValueOverride) => zapBridge.populateTransaction.swapAndRedeemAndSwap(...BridgeUtils.makeEasySubParams(castArgs, this.chainId, baseToken), tokenArgs.tokenIndexFrom, 0, amountFrom, minToSwapOriginHighSlippage, transactionDeadline, 0, tokenArgs.tokenIndexTo, minToSwapDestFromOriginHighSlippage, // swapMinAmount
            bridgeTransactionDeadline, // toSwapDeadline, // swapDeadline
            BridgeUtils.makeOverrides(amountFrom, withValueOverride));
            switch (args.tokenTo.hash) {
                case Tokens.NUSD.hash:
                    return zapBridge.populateTransaction.swapAndRedeem(...BridgeUtils.makeEasySubParams(castArgs, this.chainId, Tokens.NUSD), tokenArgs.tokenIndexFrom, 0, amountFrom, minToSwapOriginHighSlippage, transactionDeadline);
                case Tokens.GMX.hash:
                    let params = BridgeUtils.makeEasyParams(castArgs, this.chainId, Tokens.GMX);
                    switch (this.chainId) {
                        case ChainId.ARBITRUM:
                            return zapBridge.populateTransaction.deposit(...params);
                        default:
                            let [addrTo, chainTo, , amount] = params;
                            return this.bridgeInstance.populateTransaction.redeem(addrTo, chainTo, Tokens.GMX.wrapperAddress(this.chainId), amount);
                    }
                default:
                    if (chainIdTo === ChainId.ETH) {
                        if ((BridgeUtils.isL2ETHChain(this.chainId)) && (args.tokenFrom.swapType === SwapType.ETH)) {
                            if (args.tokenFrom.isEqual(Tokens.NETH)) {
                                return zapBridge.populateTransaction.redeem(...BridgeUtils.makeEasyParams(castArgs, this.chainId, Tokens.NETH));
                            }
                            else if (BridgeUtils.isETHLikeToken(args.tokenFrom)) {
                                return zapBridge.populateTransaction.swapAndRedeem(...BridgeUtils.makeEasySubParams(castArgs, this.chainId, Tokens.NETH), tokenArgs.tokenIndexFrom, 0, amountFrom, minToSwapOriginHighSlippage, // minToSwapOrigin, // minToSwapOriginHighSlippage,
                                transactionDeadline);
                            }
                            else {
                                return zapBridge.populateTransaction.swapETHAndRedeem(...BridgeUtils.makeEasySubParams(castArgs, this.chainId, Tokens.NETH), tokenArgs.tokenIndexFrom, 0, amountFrom, minToSwapOriginHighSlippage, // minToSwapOrigin, // minToSwapOriginHighSlippage,
                                transactionDeadline, { value: amountFrom });
                            }
                        }
                        else if (args.tokenFrom.isEqual(Tokens.NUSD)) {
                            return zapBridge.populateTransaction.redeemAndRemove(...BridgeUtils.makeEasySubParams(castArgs, this.chainId, Tokens.NUSD), amountFrom, tokenArgs.tokenIndexTo, minToSwapDest, transactionDeadline);
                        }
                        else {
                            return zapBridge.populateTransaction.swapAndRedeemAndRemove(...BridgeUtils.makeEasySubParams(castArgs, this.chainId, Tokens.NUSD), tokenArgs.tokenIndexFrom, 0, amountFrom, minToSwapOriginHighSlippage, transactionDeadline, tokenArgs.tokenIndexTo, //swapTokenIndex
                            minToSwapDestFromOriginHighSlippage, // swapMinAmount
                            bridgeTransactionDeadline);
                        }
                    }
                    else {
                        if (args.tokenFrom.isEqual(Tokens.NUSD)) {
                            return easyRedeemAndSwap(Tokens.NUSD);
                        }
                        else if (args.tokenFrom.isEqual(Tokens.NETH)) {
                            return easyRedeemAndSwap(Tokens.NETH);
                        }
                        else if (args.tokenFrom.swapType === SwapType.ETH) {
                            if (BridgeUtils.isETHLikeToken(args.tokenFrom)) {
                                return easySwapAndRedeemAndSwap(Tokens.NETH, false);
                            }
                            else {
                                return zapBridge.populateTransaction.swapETHAndRedeemAndSwap(...BridgeUtils.makeEasySubParams(castArgs, this.chainId, Tokens.NETH), tokenArgs.tokenIndexFrom, 0, amountFrom, minToSwapOriginHighSlippage, transactionDeadline, 0, tokenArgs.tokenIndexTo, minToSwapDestFromOriginHighSlippage, bridgeTransactionDeadline, { value: amountFrom });
                            }
                        }
                        else {
                            return easySwapAndRedeemAndSwap(Tokens.NUSD, false);
                        }
                    }
            }
        }
        makeBridgeTokenArgs(args) {
            let { tokenFrom, tokenTo, chainIdTo } = args;
            const swapparoo = (t, check, swappy) => t.isEqual(check) ? swappy : t, swappadoo = (check, swappy) => (t1, t2) => [swapparoo(t1, check, swappy), swapparoo(t2, check, swappy)];
            let kangaroo;
            switch (tokenFrom.swapType) {
                case SwapType.ETH:
                    kangaroo = swappadoo(Tokens.ETH, Tokens.WETH);
                    break;
                case SwapType.AVAX:
                    kangaroo = swappadoo(Tokens.AVAX, Tokens.WAVAX);
                    break;
                case SwapType.MOVR:
                    kangaroo = swappadoo(Tokens.MOVR, Tokens.WMOVR);
                    break;
                default:
                    kangaroo = (t1, t2) => [t1, t2];
            }
            [tokenFrom, tokenTo] = kangaroo(tokenFrom, tokenTo);
            const findSymbol = (tokA, tokB) => {
                let compareTok = tokB;
                if (tokB.isEqual(Tokens.WETH_E)) {
                    compareTok = Tokens.AVWETH;
                }
                else if (tokB.isEqual(Tokens.ETH)) {
                    compareTok = Tokens.WETH;
                }
                else if (tokB.isWrappedToken) {
                    compareTok = tokB.underlyingToken;
                }
                return tokA.isEqual(compareTok);
            };
            const makeTokenArgs = (chainId, t) => {
                let toks = SwapPools.bridgeSwappableTypePoolsByChain[chainId]?.[t.swapType]?.poolTokens, idx = toks.findIndex((tok) => findSymbol(tok, t));
                return [toks, idx];
            };
            const [fromChainTokens, tokenIndexFrom] = makeTokenArgs(this.chainId, tokenFrom), [toChainTokens, tokenIndexTo] = makeTokenArgs(chainIdTo, tokenTo);
            return {
                fromChainTokens,
                toChainTokens,
                tokenFrom,
                tokenTo,
                tokenIndexFrom,
                tokenIndexTo
            };
        }
    }
    Bridge.SynapseBridge = SynapseBridge;
    const REQUIRED_CONFS = {
        [ChainId.ETH]: 7,
        [ChainId.OPTIMISM]: 1,
        [ChainId.BSC]: 14,
        [ChainId.POLYGON]: 128,
        [ChainId.FANTOM]: 5,
        [ChainId.BOBA]: 1,
        [ChainId.MOONBEAM]: 21,
        [ChainId.MOONRIVER]: 21,
        [ChainId.ARBITRUM]: 40,
        [ChainId.AVALANCHE]: 5,
        [ChainId.HARMONY]: 1,
    };
    function getRequiredConfirmationsForBridge(network) {
        let chainId = network instanceof Networks.Network ? network.chainId : network;
        return REQUIRED_CONFS[chainId] ?? -1;
    }
    Bridge.getRequiredConfirmationsForBridge = getRequiredConfirmationsForBridge;
    function bridgeSwapSupported(args) {
        return TokenSwap.bridgeSwapSupported(args);
    }
    Bridge.bridgeSwapSupported = bridgeSwapSupported;
})(Bridge || (Bridge = {}));
