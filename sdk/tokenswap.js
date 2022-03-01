import { Tokens } from "./tokens.js";
import { SwapPools } from "./swappools.js";
import { rejectPromise } from "./common/utils.js";
import { SynapseEntities } from "./entities.js";
import { SwapFactory } from "./contracts.js";
import { ChainId } from "./common/chainid.js";
import { Networks } from "./common/networks.js";
import { SwapType } from "./internal/swaptype.js";
import { newProviderForNetwork } from "./internal/rpcproviders.js";
export var UnsupportedSwapErrors;
(function (UnsupportedSwapErrors) {
    let UnsupportedSwapErrorKind;
    (function (UnsupportedSwapErrorKind) {
        UnsupportedSwapErrorKind[UnsupportedSwapErrorKind["UnsupportedToken"] = 0] = "UnsupportedToken";
        UnsupportedSwapErrorKind[UnsupportedSwapErrorKind["UnsupportedTokenNetFrom"] = 1] = "UnsupportedTokenNetFrom";
        UnsupportedSwapErrorKind[UnsupportedSwapErrorKind["UnsupportedTokenNetTo"] = 2] = "UnsupportedTokenNetTo";
        UnsupportedSwapErrorKind[UnsupportedSwapErrorKind["NonmatchingSwapTypes"] = 3] = "NonmatchingSwapTypes";
        UnsupportedSwapErrorKind[UnsupportedSwapErrorKind["BobaToL1"] = 4] = "BobaToL1";
        UnsupportedSwapErrorKind[UnsupportedSwapErrorKind["ETHOnBoba"] = 5] = "ETHOnBoba";
    })(UnsupportedSwapErrorKind = UnsupportedSwapErrors.UnsupportedSwapErrorKind || (UnsupportedSwapErrors.UnsupportedSwapErrorKind = {}));
    UnsupportedSwapErrors.tokenNotSupported = (t, netName) => ({
        errorKind: UnsupportedSwapErrorKind.UnsupportedToken,
        reason: `Token ${t.symbol} not supported on network ${netName}`,
    });
    UnsupportedSwapErrors.tokenNotSupportedNetFrom = (t, netName) => ({
        errorKind: UnsupportedSwapErrorKind.UnsupportedTokenNetFrom,
        reason: `Token ${t.symbol} not supported on 'from' network ${netName}`,
    });
    UnsupportedSwapErrors.tokenNotSupportedNetTo = (t, netName) => ({
        errorKind: UnsupportedSwapErrorKind.UnsupportedTokenNetTo,
        reason: `Token ${t.symbol} not supported on 'to' network ${netName}`,
    });
    UnsupportedSwapErrors.nonMatchingSwapTypes = (st1, st2) => ({
        errorKind: UnsupportedSwapErrorKind.NonmatchingSwapTypes,
        reason: "Token swap types don't match",
    });
    UnsupportedSwapErrors.ethOnBoba = () => ({
        errorKind: UnsupportedSwapErrorKind.ETHOnBoba,
        reason: "Currently, the SDK only supports bridging Stablecoins to and from BOBA",
    });
    UnsupportedSwapErrors.bobaToL1 = () => ({
        errorKind: UnsupportedSwapErrorKind.BobaToL1,
        reason: "Bridging ETH from Boba Mainnet to L1 not currently supported",
    });
})(UnsupportedSwapErrors || (UnsupportedSwapErrors = {}));
export var TokenSwap;
(function (TokenSwap) {
    function swapSupported(args) {
        const { tokenFrom, tokenTo, chainId } = args;
        return checkCanSwap(tokenFrom, tokenTo, chainId);
    }
    TokenSwap.swapSupported = swapSupported;
    function bridgeSwapSupported(args) {
        const { tokenFrom, tokenTo, chainIdFrom, chainIdTo } = args;
        let swapSupported = true, reasonNotSupported;
        const canSwap = checkCanSwap(tokenFrom, tokenTo, chainIdFrom, chainIdTo);
        if (!canSwap.swapSupported) {
            return canSwap;
        }
        const checkBoba = (c, t) => c === ChainId.BOBA && t.swapType === SwapType.ETH;
        const isEthFromBoba = checkBoba(chainIdFrom, tokenFrom), isEthToBoba = checkBoba(chainIdTo, tokenTo);
        if (isEthFromBoba || isEthToBoba) {
            swapSupported = false;
            reasonNotSupported = UnsupportedSwapErrors.ethOnBoba();
        }
        return { swapSupported, reasonNotSupported };
    }
    TokenSwap.bridgeSwapSupported = bridgeSwapSupported;
    async function calculateSwapRate(args) {
        const { swapSupported: canSwap, reasonNotSupported } = swapSupported(args);
        if (!canSwap) {
            return rejectPromise(reasonNotSupported);
        }
        const { swapInstance, tokenIndexFrom, tokenIndexTo } = await swapSetup(args.tokenFrom, args.tokenTo, args.chainId);
        return swapInstance.calculateSwap(tokenIndexFrom, tokenIndexTo, args.amountIn)
            .then((res) => ({ amountOut: res }));
    }
    TokenSwap.calculateSwapRate = calculateSwapRate;
    async function buildSwapTokensTransaction(args) {
        const { swapSupported: canSwap, reasonNotSupported } = swapSupported(args);
        if (!canSwap) {
            return rejectPromise(reasonNotSupported);
        }
        const { swapInstance, tokenIndexFrom, tokenIndexTo } = await swapSetup(args.tokenFrom, args.tokenTo, args.chainId);
        let { deadline } = args;
        deadline = deadline ?? Math.round((new Date().getTime() / 1000) + 60 * 10);
        const overrides = args.tokenFrom.isEqual(Tokens.ETH) ? { value: args.amountIn } : {};
        return swapInstance.populateTransaction.swap(tokenIndexFrom, tokenIndexTo, args.amountIn, args.minAmountOut, deadline, overrides);
    }
    TokenSwap.buildSwapTokensTransaction = buildSwapTokensTransaction;
    function intermediateTokens(chainId, token) {
        if (mintBurnSwapTypes.includes(token.swapType)) {
            return { intermediateToken: token, bridgeConfigIntermediateToken: token };
        }
        let intermediateToken, bridgeConfigIntermediateToken;
        switch (token.swapType) {
            case SwapType.SYN:
                intermediateToken = Tokens.SYN;
                break;
            case SwapType.FRAX:
                bridgeConfigIntermediateToken = chainId === ChainId.ETH ? Tokens.FRAX : Tokens.SYN_FRAX;
                break;
            case SwapType.ETH:
                intermediateToken = Tokens.NETH;
                bridgeConfigIntermediateToken = chainId === ChainId.ETH ? Tokens.WETH : Tokens.NETH;
                break;
            case SwapType.AVAX:
                intermediateToken = Tokens.WAVAX;
                break;
            case SwapType.MOVR:
                intermediateToken = Tokens.WMOVR;
                break;
            default:
                intermediateToken = Tokens.NUSD;
                break;
        }
        bridgeConfigIntermediateToken = bridgeConfigIntermediateToken ?? intermediateToken;
        return { intermediateToken, bridgeConfigIntermediateToken };
    }
    TokenSwap.intermediateTokens = intermediateTokens;
    function detailedTokenSwapMap() {
        let res = {};
        const allChainIds = ChainId.supportedChainIds();
        for (const c1 of allChainIds) {
            let n1 = Networks.fromChainId(c1);
            let networkTokens = n1.tokens;
            res[c1] = networkTokens.map((t) => {
                let swapType = t.swapType;
                let tokSwapMap = {
                    token: t,
                };
                for (const c2 of allChainIds) {
                    if (c1 === c2)
                        continue;
                    let outToks = SwapPools.bridgeSwappableTypePoolsByChain[c2][swapType]?.poolTokens || [];
                    if (outToks.length === 0)
                        continue;
                    tokSwapMap[c2] = outToks;
                }
                return tokSwapMap;
            });
        }
        return res;
    }
    TokenSwap.detailedTokenSwapMap = detailedTokenSwapMap;
    async function swapContract(token, chainId) {
        const poolConfigInstance = SynapseEntities.poolConfig(), lpToken = intermediateToken(token, chainId), { poolAddress } = await poolConfigInstance.getPoolConfig(lpToken.address(chainId), chainId);
        return SwapFactory.connect(poolAddress, newProviderForNetwork(chainId));
    }
    async function swapSetup(tokenFrom, tokenTo, chainId) {
        const swapInstance = await swapContract(tokenFrom, chainId), tokenIndexFrom = await swapInstance.getTokenIndex(tokenFrom.address(chainId)), tokenIndexTo = await swapInstance.getTokenIndex(tokenTo.address(chainId));
        return {
            swapInstance,
            tokenIndexFrom,
            tokenIndexTo,
        };
    }
    function intermediateToken(token, chainId) {
        const { intermediateToken, bridgeConfigIntermediateToken } = intermediateTokens(chainId, token);
        return intermediateToken ?? bridgeConfigIntermediateToken;
    }
    const mintBurnSwapTypes = [
        SwapType.HIGH, SwapType.DOG, SwapType.JUMP,
        SwapType.NFD, SwapType.OHM, SwapType.SOLAR,
        SwapType.GMX,
    ];
    function checkCanSwap(tokenFrom, tokenTo, chainFrom, chainTo) {
        const tokensCanSwap = checkTokensCanSwap(tokenFrom, tokenTo), tokensSupported = checkTokensSupported(tokenFrom, tokenTo, chainFrom, chainTo);
        if (!tokensSupported.swapSupported) {
            return tokensSupported;
        }
        else if (!tokensCanSwap.swapSupported) {
            return tokensCanSwap;
        }
        return { swapSupported: true };
    }
    function checkTokensCanSwap(tokenFrom, tokenTo) {
        let swapSupported = true, reasonNotSupported;
        if (tokenFrom.swapType !== tokenTo.swapType) {
            swapSupported = false;
            reasonNotSupported = UnsupportedSwapErrors.nonMatchingSwapTypes(tokenFrom.swapType, tokenTo.swapType);
        }
        return { swapSupported, reasonNotSupported };
    }
    function checkTokensSupported(tokenFrom, tokenTo, chainIdFrom, chainIdTo) {
        const unsupportedFromFunc = (typeof chainIdTo !== "undefined"
            ? UnsupportedSwapErrors.tokenNotSupportedNetFrom
            : UnsupportedSwapErrors.tokenNotSupported), unsupportedToFunc = (typeof chainIdTo !== "undefined"
            ? UnsupportedSwapErrors.tokenNotSupportedNetTo
            : UnsupportedSwapErrors.tokenNotSupported);
        const netFrom = Networks.fromChainId(chainIdFrom), netTo = (typeof chainIdTo !== "undefined" ? Networks.fromChainId(chainIdTo) : netFrom);
        let swapSupported = true, reasonNotSupported;
        if (!netFrom.supportsToken(tokenFrom)) {
            swapSupported = false;
            reasonNotSupported = unsupportedFromFunc(tokenFrom, netFrom.name);
        }
        else if (!netTo.supportsToken(tokenTo)) {
            swapSupported = false;
            reasonNotSupported = unsupportedToFunc(tokenTo, netTo.name);
        }
        return { swapSupported, reasonNotSupported };
    }
})(TokenSwap || (TokenSwap = {}));
