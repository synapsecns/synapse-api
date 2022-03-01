import { Tokens } from "./tokens.js";
import { ChainId } from "./common/chainid.js";
import { BaseToken } from "./token.js";
import { SwapType } from "./internal/swaptype.js";
export var SwapPools;
(function (SwapPools) {
    function moveFirstToLast(arr) {
        return [
            ...arr.slice(1),
            arr[0]
        ];
    }
    function makeSwapToken(args) {
        args.notLP = args.notLP ?? false;
        return new SwapToken({
            addresses: { [args.chainId]: args.address },
            decimals: 18,
            name: "Synapse nUSD LP Token" + (args.netName != "BSC" ? ` ${args.netName}` : ""),
            symbol: args.notLP ? "nUSD" : "nUSD-LP",
            poolName: `${args.netName} Stableswap Pool `,
            poolId: args.poolId,
            poolType: SwapType.USD,
            swapAddresses: {
                [args.chainId]: args.swapAddress,
            },
            poolTokens: args.poolTokens,
        });
    }
    function makeETHSwapToken(args) {
        return new ETHSwapToken({
            addresses: { [args.chainId]: args.address },
            decimals: 18,
            name: `Synapse ${args.poolName ?? "ETH"} LP Token ${args.netName}`,
            symbol: "nETH-LP",
            poolName: `${args.netName} ${args.poolName ?? "ETH"} Pool `,
            poolId: args.poolId,
            poolType: SwapType.ETH,
            swapAddresses: {
                [args.chainId]: args.swapAddress,
            },
            swapEthAddresses: {
                [args.chainId]: args.swapETHAddress,
            },
            poolTokens: args.poolTokens,
            nativeTokens: args.nativeTokens,
            depositTokens: args.depositTokens,
        });
    }
    class SwapToken {
        baseToken;
        poolId;
        poolName;
        poolType;
        poolTokens;
        swapAddresses = {};
        constructor(args) {
            this.baseToken = new BaseToken({
                name: args.name,
                symbol: args.symbol,
                decimals: args.decimals,
                addresses: args.addresses,
                swapType: args.poolType
            });
            this.poolId = args.poolId;
            this.poolName = args.poolName;
            this.poolType = args.poolType;
            this.swapAddresses = args.swapAddresses;
            this.poolTokens = args.poolTokens;
        }
        get name() {
            return this.baseToken.name;
        }
        get symbol() {
            return this.baseToken.symbol;
        }
        get addresses() {
            return this.baseToken.addresses;
        }
        get swapType() {
            return this.baseToken.swapType;
        }
        get hash() {
            return this.baseToken.hash;
        }
        address(chainId) {
            return this.baseToken.address(chainId);
        }
        decimals(chainId) {
            return this.baseToken.decimals(chainId);
        }
        get poolTokensForBridgeSwaps() {
            return moveFirstToLast(this.poolTokens);
        }
    }
    SwapPools.SwapToken = SwapToken;
    class ETHSwapToken extends SwapToken {
        nativeTokens;
        depositTokens;
        swapEthAddresses;
        constructor(args) {
            let { swapEthAddresses, nativeTokens, depositTokens, ...constructorArgs } = args;
            super(constructorArgs);
            if (args.swapEthAddresses) {
                this.swapEthAddresses = args.swapEthAddresses;
            }
            if (args.nativeTokens) {
                this.nativeTokens = args.nativeTokens;
            }
            if (args.depositTokens) {
                this.depositTokens = args.depositTokens;
            }
        }
        get poolTokensForBridgeSwaps() {
            if (this.depositTokens?.length > 0) {
                return moveFirstToLast(this.depositTokens);
            }
            return moveFirstToLast(this.poolTokens);
        }
    }
    SwapPools.ETHSwapToken = ETHSwapToken;
    const USDPoolTokens = (tok = Tokens.DAI, nUSD = true) => [
        ...(nUSD ? [Tokens.NUSD] : []),
        ...(tok === null ? [] : [tok]),
        Tokens.USDC,
        Tokens.USDT,
    ];
    const USDDaiPool = USDPoolTokens(), USDMIMPool = USDPoolTokens(Tokens.MIM);
    const ETHTokensPool = (t) => [Tokens.NETH, t], WETHTokenPool = ETHTokensPool(Tokens.WETH), ETHTokenPool = ETHTokensPool(Tokens.ETH);
    SwapPools.ETH_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.ETH,
        address: Tokens.NUSD.address(ChainId.ETH),
        netName: "Ethereum",
        poolId: 420,
        swapAddress: "0x1116898DdA4015eD8dDefb84b6e8Bc24528Af2d8",
        poolTokens: USDPoolTokens(Tokens.DAI, false),
        notLP: true
    });
    SwapPools.OPTIMISM_ETH_SWAP_TOKEN = makeETHSwapToken({
        chainId: ChainId.OPTIMISM,
        address: "0x4619a06ddd3b8f0f951354ec5e75c09cd1cd1aef",
        netName: "Optimism",
        poolId: 0,
        swapAddress: "0xE27BFf97CE92C3e1Ff7AA9f86781FDd6D48F5eE9",
        swapETHAddress: "0x8c7d5f8A8e154e1B59C92D8FB71314A43F32ef7B",
        poolTokens: WETHTokenPool,
        nativeTokens: ETHTokenPool,
    });
    SwapPools.BSC_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.BSC,
        address: "0xa4b7Bc06EC817785170C2DbC1dD3ff86CDcdcc4C",
        netName: "BSC",
        poolId: 1,
        swapAddress: "0x28ec0B36F0819ecB5005cAB836F4ED5a2eCa4D13",
        poolTokens: USDPoolTokens(Tokens.BUSD),
    });
    SwapPools.POLYGON_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.POLYGON,
        address: "0x7479e1bc2f2473f9e78c89b4210eb6d55d33b645",
        netName: "Polygon",
        poolId: 1,
        swapAddress: "0x85fCD7Dd0a1e1A9FCD5FD886ED522dE8221C3EE5",
        poolTokens: USDDaiPool,
    });
    SwapPools.FANTOM_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.FANTOM,
        address: "0x464d121D3cA63cEEfd390D76f19364D3Bd024cD2",
        netName: "Fantom",
        poolId: 1,
        swapAddress: "0x2913E812Cf0dcCA30FB28E6Cac3d2DCFF4497688",
        poolTokens: USDMIMPool,
    });
    SwapPools.FANTOM_ETH_SWAP_TOKEN = makeETHSwapToken({
        chainId: ChainId.FANTOM,
        address: "0x0e3dD3403ee498694A8f61B04AFed8919F747f77",
        netName: "Fantom",
        poolId: 2,
        swapAddress: "0x8D9bA570D6cb60C7e3e0F31343Efe75AB8E65FB1",
        poolTokens: ETHTokensPool(Tokens.FTM_ETH),
    });
    SwapPools.BOBA_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.BOBA,
        address: "0x9D7283A6AeeD9BCd4Ac70876fEA2b69a63DD8cb9",
        netName: "Boba",
        poolId: 1,
        swapAddress: "0x75FF037256b36F15919369AC58695550bE72fead",
        poolTokens: USDDaiPool,
    });
    SwapPools.BOBA_ETH_SWAP_TOKEN = makeETHSwapToken({
        chainId: ChainId.BOBA,
        address: "0x498657f2AF18D525049dE520dD86ee376Db9c67c",
        netName: "Boba",
        poolId: 2,
        swapAddress: "0x753bb855c8fe814233d26Bb23aF61cb3d2022bE5",
        swapETHAddress: "0x4F4f66964335D7bef23C16a62Fcd3d1E89f02959",
        poolTokens: WETHTokenPool,
        nativeTokens: ETHTokenPool,
    });
    SwapPools.ARBITRUM_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.ARBITRUM,
        address: "0xADeac0343C2Ac62DFE5A5f51E896AefFF5Ab513E",
        netName: "Arbitrum",
        poolId: 2,
        swapAddress: "0x0Db3FE3B770c95A0B99D1Ed6F2627933466c0Dd8",
        poolTokens: USDMIMPool,
    });
    SwapPools.ARBITRUM_ETH_SWAP_TOKEN = makeETHSwapToken({
        chainId: ChainId.ARBITRUM,
        address: "0xD70A52248e546A3B260849386410C7170c7BD1E9",
        netName: "Arbitrum",
        poolId: 0,
        swapAddress: "0xa067668661C84476aFcDc6fA5D758C4c01C34352",
        swapETHAddress: "0x1c3fe783a7c06bfAbd124F2708F5Cc51fA42E102",
        poolTokens: WETHTokenPool,
        nativeTokens: ETHTokenPool,
    });
    SwapPools.AVALANCHE_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.AVALANCHE,
        address: "0xCA87BF3ec55372D9540437d7a86a7750B42C02f4",
        netName: "Avalanche",
        poolId: 1,
        swapAddress: "0xED2a7edd7413021d440b09D654f3b87712abAB66",
        poolTokens: USDDaiPool,
    });
    const AVAX_AVWETH_POOLTOKENS = ETHTokensPool(Tokens.AVWETH), AVAX_WETHE_POOLTOKENS = ETHTokensPool(Tokens.WETH_E);
    SwapPools.AVALANCHE_ETH_SWAP_TOKEN = makeETHSwapToken({
        chainId: ChainId.AVALANCHE,
        address: "0x5dF1dB940dd8fEE0e0eB0C8917cb50b4dfaDF98c",
        netName: "Avalanche",
        poolId: 2,
        swapAddress: "0x77a7e60555bC18B4Be44C181b2575eee46212d44",
        swapETHAddress: "0xdd60483Ace9B215a7c019A44Be2F22Aa9982652E",
        poolTokens: AVAX_AVWETH_POOLTOKENS,
        nativeTokens: AVAX_WETHE_POOLTOKENS,
        depositTokens: AVAX_WETHE_POOLTOKENS,
    });
    SwapPools.AURORA_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.AURORA,
        address: "0xEAdC3524f3F007cdC5104BF28663b1141D3e3127",
        netName: "Aurora",
        poolId: 1,
        swapAddress: "0xcEf6C2e20898C2604886b888552CA6CcF66933B0",
        poolTokens: USDPoolTokens(null),
    });
    SwapPools.HARMONY_POOL_SWAP_TOKEN = makeSwapToken({
        chainId: ChainId.HARMONY,
        address: "0xE269abBFAF52b26D2632F55B6b223A5223088B96",
        netName: "Harmony",
        poolId: 1,
        swapAddress: "0x3ea9B0ab55F34Fb188824Ee288CeaEfC63cf908e",
        poolTokens: USDDaiPool,
    });
    const ONEETH_POOL_TOKENS = ETHTokensPool(Tokens.ONE_ETH);
    SwapPools.HARMONY_ONEETH_TOKEN = makeETHSwapToken({
        chainId: ChainId.HARMONY,
        address: "0x464d121D3cA63cEEfd390D76f19364D3Bd024cD2",
        netName: "Harmony",
        poolName: "1ETH",
        poolId: 1,
        swapAddress: "0x2913E812Cf0dcCA30FB28E6Cac3d2DCFF4497688",
        poolTokens: ONEETH_POOL_TOKENS,
        nativeTokens: ONEETH_POOL_TOKENS,
        depositTokens: ONEETH_POOL_TOKENS,
    });
    const makeSingleTokenPool = (t, swapType) => ({ poolTokens: [t], swapType }), ETH_Pool = makeSingleTokenPool(Tokens.ETH, SwapType.ETH), SYN_Pool = makeSingleTokenPool(Tokens.SYN, SwapType.SYN), FRAX_Pool = makeSingleTokenPool(Tokens.FRAX, SwapType.FRAX), HIGH_Pool = makeSingleTokenPool(Tokens.HIGH, SwapType.HIGH), DOG_Pool = makeSingleTokenPool(Tokens.DOG, SwapType.DOG), JUMP_Pool = makeSingleTokenPool(Tokens.JUMP, SwapType.JUMP), NFD_Pool = makeSingleTokenPool(Tokens.NFD, SwapType.NFD), GOHM_Pool = makeSingleTokenPool(Tokens.GOHM, SwapType.OHM), GMX_Pool = makeSingleTokenPool(Tokens.GMX, SwapType.GMX), SOLAR_Pool = makeSingleTokenPool(Tokens.SOLAR, SwapType.SOLAR), AVAX_Pool = makeSingleTokenPool(Tokens.AVAX, SwapType.AVAX), WAVAX_Pool = makeSingleTokenPool(Tokens.WAVAX, SwapType.AVAX), MOVR_Pool = makeSingleTokenPool(Tokens.MOVR, SwapType.MOVR), WMOVR_Pool = makeSingleTokenPool(Tokens.WMOVR, SwapType.MOVR);
    const makeTokenPoolsMap = (usdSwapTokens, ethSwapTokens, ...pools) => {
        let m = {
            [SwapType.SYN]: SYN_Pool.poolTokens,
        };
        if (usdSwapTokens) {
            m[SwapType.USD] = usdSwapTokens;
        }
        if (ethSwapTokens) {
            m[SwapType.ETH] = ethSwapTokens;
        }
        for (const p of pools) {
            m[p.swapType] = p.poolTokens;
        }
        return m;
    };
    SwapPools.bridgeSwappableTokensByType = {
        [ChainId.ETH]: makeTokenPoolsMap([...SwapPools.ETH_POOL_SWAP_TOKEN.poolTokens, Tokens.NUSD], ETH_Pool.poolTokens, HIGH_Pool, DOG_Pool, FRAX_Pool, GOHM_Pool),
        [ChainId.OPTIMISM]: makeTokenPoolsMap(null, SwapPools.OPTIMISM_ETH_SWAP_TOKEN.poolTokens),
        [ChainId.BSC]: makeTokenPoolsMap(SwapPools.BSC_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps, null, HIGH_Pool, DOG_Pool, JUMP_Pool, NFD_Pool),
        [ChainId.POLYGON]: makeTokenPoolsMap(SwapPools.POLYGON_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps, null, DOG_Pool, NFD_Pool, GOHM_Pool),
        [ChainId.FANTOM]: makeTokenPoolsMap(SwapPools.FANTOM_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps, SwapPools.FANTOM_ETH_SWAP_TOKEN.poolTokensForBridgeSwaps, JUMP_Pool, FRAX_Pool, GOHM_Pool),
        [ChainId.BOBA]: makeTokenPoolsMap(SwapPools.BOBA_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps, SwapPools.BOBA_ETH_SWAP_TOKEN.poolTokens),
        [ChainId.MOONBEAM]: makeTokenPoolsMap(null, null, // [Tokens.WETHBEAM],
        SOLAR_Pool, WAVAX_Pool, WMOVR_Pool),
        [ChainId.MOONRIVER]: makeTokenPoolsMap(null, null, FRAX_Pool, GOHM_Pool, SOLAR_Pool, MOVR_Pool),
        [ChainId.ARBITRUM]: makeTokenPoolsMap(SwapPools.ARBITRUM_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps, SwapPools.ARBITRUM_ETH_SWAP_TOKEN.poolTokens, GOHM_Pool, GMX_Pool),
        [ChainId.AVALANCHE]: makeTokenPoolsMap(SwapPools.AVALANCHE_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps, SwapPools.AVALANCHE_ETH_SWAP_TOKEN.poolTokensForBridgeSwaps, NFD_Pool, GOHM_Pool, GMX_Pool, AVAX_Pool),
        [ChainId.AURORA]: makeTokenPoolsMap(SwapPools.AURORA_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps),
        [ChainId.HARMONY]: makeTokenPoolsMap(SwapPools.HARMONY_POOL_SWAP_TOKEN.poolTokensForBridgeSwaps, SwapPools.HARMONY_ONEETH_TOKEN.poolTokensForBridgeSwaps, FRAX_Pool),
    };
    function makeSwapTypeTokenPool(poolSwapToken, ethSwapToken, ...pools) {
        let m = {};
        if (poolSwapToken) {
            m[SwapType.USD] = poolSwapToken;
        }
        if (ethSwapToken) {
            m[SwapType.ETH] = ethSwapToken;
        }
        pools.forEach((s) => m = { ...m, [s.swapType]: { poolTokens: s.poolTokens } });
        return m;
    }
    SwapPools.bridgeSwappableTypePoolsByChain = {
        [ChainId.ETH]: makeSwapTypeTokenPool(SwapPools.ETH_POOL_SWAP_TOKEN, null, ETH_Pool, SYN_Pool, HIGH_Pool, DOG_Pool, GOHM_Pool, FRAX_Pool),
        [ChainId.OPTIMISM]: makeSwapTypeTokenPool(null, SwapPools.OPTIMISM_ETH_SWAP_TOKEN, SYN_Pool),
        [ChainId.BSC]: makeSwapTypeTokenPool(SwapPools.BSC_POOL_SWAP_TOKEN, null, SYN_Pool, HIGH_Pool, DOG_Pool, JUMP_Pool, NFD_Pool),
        [ChainId.POLYGON]: makeSwapTypeTokenPool(SwapPools.POLYGON_POOL_SWAP_TOKEN, null, SYN_Pool, NFD_Pool, DOG_Pool, GOHM_Pool),
        [ChainId.FANTOM]: makeSwapTypeTokenPool(SwapPools.FANTOM_POOL_SWAP_TOKEN, SwapPools.FANTOM_ETH_SWAP_TOKEN, SYN_Pool, JUMP_Pool, GOHM_Pool, FRAX_Pool),
        [ChainId.BOBA]: makeSwapTypeTokenPool(SwapPools.BOBA_POOL_SWAP_TOKEN, SwapPools.BOBA_ETH_SWAP_TOKEN, SYN_Pool),
        [ChainId.MOONBEAM]: makeSwapTypeTokenPool(null, null, SYN_Pool, SOLAR_Pool, GOHM_Pool, WMOVR_Pool, WAVAX_Pool),
        [ChainId.MOONRIVER]: makeSwapTypeTokenPool(null, null, SYN_Pool, GOHM_Pool, SOLAR_Pool, FRAX_Pool, MOVR_Pool),
        [ChainId.ARBITRUM]: makeSwapTypeTokenPool(SwapPools.ARBITRUM_POOL_SWAP_TOKEN, SwapPools.ARBITRUM_ETH_SWAP_TOKEN, SYN_Pool, GOHM_Pool, GMX_Pool),
        [ChainId.AVALANCHE]: makeSwapTypeTokenPool(SwapPools.AVALANCHE_POOL_SWAP_TOKEN, SwapPools.AVALANCHE_ETH_SWAP_TOKEN, SYN_Pool, NFD_Pool, GOHM_Pool, GMX_Pool, AVAX_Pool),
        [ChainId.AURORA]: makeSwapTypeTokenPool(SwapPools.AURORA_POOL_SWAP_TOKEN, null, SYN_Pool),
        [ChainId.HARMONY]: makeSwapTypeTokenPool(SwapPools.HARMONY_POOL_SWAP_TOKEN, SwapPools.HARMONY_ONEETH_TOKEN, SYN_Pool, FRAX_Pool)
    };
    function getAllSwappableTokensForNetwork(chainId) {
        let swappableTokens = [], groupsForChain = SwapPools.bridgeSwappableTokensByType[chainId];
        Object.keys(groupsForChain).forEach((grp) => {
            swappableTokens = [...swappableTokens, ...groupsForChain[grp]];
        });
        return swappableTokens;
    }
    SwapPools.getAllSwappableTokensForNetwork = getAllSwappableTokensForNetwork;
    SwapPools.swapGroupsForNetwork = (chainId) => Object.keys(SwapPools.bridgeSwappableTokensByType[chainId]);
    function stableswapPoolForNetwork(chainId) {
        switch (chainId) {
            case ChainId.ETH:
                return SwapPools.ETH_POOL_SWAP_TOKEN;
            case ChainId.BSC:
                return SwapPools.BSC_POOL_SWAP_TOKEN;
            case ChainId.POLYGON:
                return SwapPools.POLYGON_POOL_SWAP_TOKEN;
            case ChainId.FANTOM:
                return SwapPools.FANTOM_POOL_SWAP_TOKEN;
            case ChainId.BOBA:
                return SwapPools.BOBA_POOL_SWAP_TOKEN;
            case ChainId.ARBITRUM:
                return SwapPools.ARBITRUM_POOL_SWAP_TOKEN;
            case ChainId.AVALANCHE:
                return SwapPools.AVALANCHE_POOL_SWAP_TOKEN;
            case ChainId.AURORA:
                return SwapPools.AURORA_POOL_SWAP_TOKEN;
            case ChainId.HARMONY:
                return SwapPools.HARMONY_POOL_SWAP_TOKEN;
        }
        return undefined;
    }
    SwapPools.stableswapPoolForNetwork = stableswapPoolForNetwork;
    function ethSwapPoolForNetwork(chainId) {
        switch (chainId) {
            case ChainId.OPTIMISM:
                return SwapPools.OPTIMISM_ETH_SWAP_TOKEN;
            case ChainId.FANTOM:
                return SwapPools.FANTOM_ETH_SWAP_TOKEN;
            case ChainId.BOBA:
                return SwapPools.BOBA_ETH_SWAP_TOKEN;
            case ChainId.ARBITRUM:
                return SwapPools.ARBITRUM_ETH_SWAP_TOKEN;
            case ChainId.AVALANCHE:
                return SwapPools.AVALANCHE_ETH_SWAP_TOKEN;
            case ChainId.HARMONY:
                return SwapPools.HARMONY_ONEETH_TOKEN;
        }
        return undefined;
    }
    SwapPools.ethSwapPoolForNetwork = ethSwapPoolForNetwork;
})(SwapPools || (SwapPools = {}));
function filterGrps(chainAGrps, chainBGrpsMap) {
    let tokens = [];
    Object.keys(chainBGrpsMap).forEach((grp) => {
        if (chainAGrps.includes(grp)) {
            tokens = [...tokens, ...chainBGrpsMap[grp]];
        }
    });
    return tokens;
}
function swapGroupsLoop(chainIdA, swapGrps) {
    let res = {};
    ChainId.supportedChainIds().forEach((chainId) => {
        if (chainIdA === chainId) {
            return;
        }
        res[chainId] = filterGrps(swapGrps, SwapPools.bridgeSwappableTokensByType[chainId]);
    });
    return res;
}
/**
 * @deprecated Use {@link networkSwapTokensMap} instead.
 */
export function swappableTokens(chainIdA, chainIdB) {
    return networkSwapTokensMap(chainIdA, chainIdB);
}
/**
 * Returns a map of swappable tokens for two given networks; or, if a second chainid isn't passed,
 * a map of all swappable tokens for the passed chainid between all supported networks.
 * @param chainIdA
 * @param chainIdB Optional second network; if passed, a map of swappable tokens between ONLY chainIdA and chainIdB is returned.
 * @return NetworkSwappableTokensMap
 */
export function networkSwapTokensMap(chainIdA, chainIdB) {
    let res = {};
    const swapGrpsA = SwapPools.swapGroupsForNetwork(chainIdA);
    if (typeof chainIdB !== 'undefined') {
        res[chainIdB] = filterGrps(swapGrpsA, SwapPools.bridgeSwappableTokensByType[chainIdB]);
    }
    else {
        res = swapGroupsLoop(chainIdA, swapGrpsA);
    }
    return res;
}
/**
 * @deprecated Use {@link allNetworksSwapTokensMap} instead.
 */
export function swappableTokensAllNetworks() {
    return allNetworksSwapTokensMap();
}
/**
 * Returns map of all swappable tokens between all supported networks.
 * @return AllNetworksSwappableTokensMap
 */
export function allNetworksSwapTokensMap() {
    let res = {};
    ChainId.supportedChainIds().forEach((chainIdA) => {
        const swapGrpsA = SwapPools.swapGroupsForNetwork(chainIdA);
        res[chainIdA] = swapGroupsLoop(chainIdA, swapGrpsA);
    });
    return res;
}
