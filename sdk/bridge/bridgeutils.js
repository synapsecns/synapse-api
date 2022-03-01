import { Tokens } from "../tokens.js";
import { Slippages } from "./slippages.js";
import { ChainId } from "../common/chainid.js";
import { Zero } from "@ethersproject/constants";
export var BridgeUtils;
(function (BridgeUtils) {
    const ETH_CHAINS = [
        ChainId.OPTIMISM,
        ChainId.FANTOM,
        ChainId.BOBA,
        ChainId.MOONBEAM,
        ChainId.ARBITRUM,
        ChainId.AVALANCHE,
        ChainId.HARMONY,
    ];
    BridgeUtils.isL2ETHChain = (chainId) => ETH_CHAINS.includes(chainId);
    BridgeUtils.DepositIfChainTokens = [
        { chainId: ChainId.FANTOM, tokens: [Tokens.JUMP], depositEth: false },
        { chainId: ChainId.POLYGON, tokens: [Tokens.NFD], depositEth: false },
        { chainId: ChainId.MOONRIVER, tokens: [Tokens.SOLAR], depositEth: false },
        { chainId: ChainId.AVALANCHE, tokens: [Tokens.AVAX, Tokens.WAVAX], altChainId: ChainId.MOONBEAM, depositEth: true },
        { chainId: ChainId.MOONRIVER, tokens: [Tokens.MOVR, Tokens.WMOVR], altChainId: ChainId.MOONBEAM, depositEth: true },
    ];
    BridgeUtils.getBridgeTxArgs = () => ({
        slippageCustom: null,
        slippageSelected: Slippages.OneTenth,
        infiniteApproval: true,
        transactionDeadline: BridgeUtils.getTimeMinutesFromNow(10),
        bridgeTransactionDeadline: BridgeUtils.getTimeMinutesFromNow(60 * 24)
    });
    function getSlippages(amountFrom, amountTo) {
        const { slippageSelected, transactionDeadline, bridgeTransactionDeadline } = BridgeUtils.getBridgeTxArgs();
        const selectedGasArgs = slippageSelected, twoTenthGasArgs = Slippages.TwoTenth, quarterGasArgs = Slippages.Quarter;
        const minToSwapOrigin = Slippages.subtractSlippage(amountFrom, selectedGasArgs), minToSwapDest = Slippages.subtractSlippage(amountTo, selectedGasArgs), minToSwapDestFromOrigin = Slippages.subtractSlippage(minToSwapDest, selectedGasArgs);
        const minToSwapOriginMediumSlippage = Slippages.subtractSlippage(amountFrom, twoTenthGasArgs), minToSwapDestMediumSlippage = Slippages.subtractSlippage(amountTo, twoTenthGasArgs), minToSwapDestFromOriginMediumSlippage = Slippages.subtractSlippage(minToSwapDestMediumSlippage, twoTenthGasArgs);
        const minToSwapOriginHighSlippage = Slippages.subtractSlippage(amountFrom, quarterGasArgs), minToSwapDestHighSlippage = Slippages.subtractSlippage(amountTo, quarterGasArgs), minToSwapDestFromOriginHighSlippage = Slippages.subtractSlippage(minToSwapDestHighSlippage, quarterGasArgs);
        return {
            slippageSelected,
            transactionDeadline,
            bridgeTransactionDeadline,
            minToSwapOrigin,
            minToSwapDest,
            minToSwapDestFromOrigin,
            minToSwapOriginMediumSlippage,
            minToSwapDestMediumSlippage,
            minToSwapDestFromOriginMediumSlippage,
            minToSwapOriginHighSlippage,
            minToSwapDestHighSlippage,
            minToSwapDestFromOriginHighSlippage,
        };
    }
    BridgeUtils.getSlippages = getSlippages;
    BridgeUtils.subBigNumSafe = (a, b) => a.gt(b) ? a.sub(b) : Zero;
    BridgeUtils.getTimeMinutesFromNow = (minutesFromNow) => Math.round((new Date().getTime() / 1000) + 60 * minutesFromNow);
    BridgeUtils.makeEasyParams = (args, chainId, t) => [args.addressTo, args.chainIdTo, t.address(chainId), args.amountFrom];
    BridgeUtils.makeEasySubParams = (args, chainId, t) => {
        let x = BridgeUtils.makeEasyParams(args, chainId, t);
        return [x[0], x[1], x[2]];
    };
    BridgeUtils.depositETHParams = (args) => [args.addressTo, args.chainIdTo, args.amountFrom];
    async function calculateSwapL2Zap(zapBridge, intermediateToken, tokenIndexFrom, tokenIndexTo, amount) {
        return zapBridge.calculateSwap(intermediateToken, tokenIndexFrom, tokenIndexTo, amount);
    }
    BridgeUtils.calculateSwapL2Zap = calculateSwapL2Zap;
    BridgeUtils.isETHLikeToken = (t) => t.isEqual(Tokens.WETH_E) || t.isEqual(Tokens.ONE_ETH) || t.isEqual(Tokens.FTM_ETH);
    BridgeUtils.makeOverrides = (value, withValue) => {
        let overrides = {};
        if (withValue) {
            overrides = { value };
        }
        return overrides;
    };
})(BridgeUtils || (BridgeUtils = {}));
