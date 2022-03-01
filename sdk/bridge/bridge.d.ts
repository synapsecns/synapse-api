import { Networks } from "../common/networks";
import type { Token } from "../token";
import { TokenSwap } from "../tokenswap";
import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ContractTransaction, PopulatedTransaction } from "@ethersproject/contracts";
/**
 * Bridge provides a wrapper around common Synapse Bridge interactions, such as output estimation, checking supported swaps/bridges,
 * and most importantly, executing Bridge transactions.
 */
export declare namespace Bridge {
    type CheckCanBridgeResult = [boolean, BigNumber];
    interface BridgeOutputEstimate {
        amountToReceive: BigNumber;
        bridgeFee: BigNumber;
    }
    /**
     * @param {BaseToken} tokenFrom {@link BaseToken} user will send to the bridge on the source chain
     * @param {BaseToken} tokenTo {@link BaseToken} user will receive from the bridge on the destination chain
     * @param {number} chainIdTo Chain ID of the destination chain
     * @param {BigNumber} amountFrom not necessarily used by this interface, and overriden in BridgeParamsWithAmounts.
     */
    interface BridgeParams {
        tokenFrom: Token;
        tokenTo: Token;
        chainIdTo: number;
        amountFrom?: BigNumber;
    }
    /**
     * @param {BigNumber} amountFrom Amount of tokenFrom (denoted in wei) that the user will send to the bridge on the source chain.
     * @param {BigNumber} amountTo Amount of tokenTo (denoted in wei) that the user will receive from the bridge on the destination chain.
     * @param {string} addressTo Optional, user can provide an address other than the one retrieved from signer to receive tokens
     * on the destination chain.
     */
    interface BridgeTransactionParams extends BridgeParams {
        amountFrom: BigNumber;
        amountTo: BigNumber;
        addressTo?: string;
    }
    /**
     * SynapseBridge is a wrapper around any Synapse Bridge contract which exists on chains supported by the Synapse Protocol.
     */
    class SynapseBridge {
        protected network: Networks.Network;
        protected chainId: number;
        protected provider: Provider;
        private readonly bridgeAddress;
        private readonly bridgeInstance;
        private readonly networkZapBridgeInstance;
        private readonly isL2Zap;
        private readonly zapBridgeAddress;
        private readonly bridgeConfigInstance;
        private readonly zapBridgeInstance;
        readonly requiredConfirmations: number;
        constructor(args: {
            network: Networks.Network | number;
            provider?: Provider;
        });
        bridgeVersion(): Promise<BigNumber>;
        WETH_ADDRESS(): Promise<string>;
        /**
         * Returns whether a swap/bridge from this Bridge's chain to another chain between two tokens
         * is supported.
         * @param {BaseToken} args.tokenFrom {@link Token} user will send to the bridge
         * @param {BaseToken} args.tokenTo {@link Token} user will receive from the bridge on the destination chain
         * @param {number} args.chainIdTo Chain ID of the destination chain
         * @return boolean value denoting whether the input params constitute a valid swap/bridge, along with a
         * string value denoting the reason for an unsupported swap, if applicable.
         */
        swapSupported(args: {
            tokenFrom: Token;
            tokenTo: Token;
            chainIdTo: number;
        }): [boolean, string];
        /**
         * Returns the estimated output of a given token on the destination chain were a user to send
         * some amount of another given token on the source chain.
         * @param {BridgeParams} args Parameters for the output estimation.
         * @return {Promise<BridgeOutputEstimate>} Object containing the estimated output of args.tokenTo, as well
         * as the estimated fee to be taken by the bridge. Note that the estimated output already accounts for the
         * bridge fee, so the bridge fee is entirely for user-facing purposes. Do not use it for calculations.
         */
        estimateBridgeTokenOutput(args: BridgeParams): Promise<BridgeOutputEstimate>;
        /**
         * Returns a populated transaction for initiating a token bridge between this Bridge (the source chain) and the bridge contract on the destination chain.
         * Note that this function **does not** send a signed transaction.
         * @param {BridgeTransactionParams} args Parameters for the bridge transaction
         * @return {Promise<PopulatedTransaction>} Populated transaction instance which can be sent via ones choice
         * of web3/ethers/etc.
         */
        buildBridgeTokenTransaction(args: BridgeTransactionParams): Promise<PopulatedTransaction>;
        /**
         * Starts the Bridge process between this Bridge (the source chain) and the bridge contract on the destination chain.
         * Note that this function **does** send a signed transaction.
         * @param {BridgeTransactionParams} args Parameters for the bridge transaction.
         * @param {Signer} signer Some instance which implements the Ethersjs {@link Signer} interface.
         * @return {Promise<ContractTransaction>}
         */
        executeBridgeTokenTransaction(args: BridgeTransactionParams, signer: Signer): Promise<ContractTransaction>;
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
        buildApproveTransaction(args: {
            token: Token | string;
            amount?: BigNumberish;
        }): Promise<PopulatedTransaction>;
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
        executeApproveTransaction(args: {
            token: Token | string;
            amount?: BigNumberish;
        }, signer: Signer): Promise<ContractTransaction>;
        getAllowanceForAddress(args: {
            address: string;
            token: Token;
        }): Promise<BigNumber>;
        private checkNeedsApprove;
        private checkHasBalance;
        private checkCanBridge;
        private buildERC20ApproveArgs;
        private checkSwapSupported;
        private calculateBridgeRate;
        private checkEasyArgs;
        private buildETHMainnetBridgeTxn;
        private buildL2BridgeTxn;
        private makeBridgeTokenArgs;
    }
    function getRequiredConfirmationsForBridge(network: Networks.Network | number): number;
    function bridgeSwapSupported(args: TokenSwap.BridgeSwapSupportedParams): TokenSwap.SwapSupportedResult;
}
