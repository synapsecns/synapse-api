import type { AddressMap, DecimalsMap } from "./common/types";
import { BaseToken } from "./token";
import type { Token, IBaseToken } from "./token";
import { SwapType } from "./internal/swaptype";
export declare namespace SwapPools {
    export interface LPToken {
        readonly poolTokens: Token[];
        readonly swapType: SwapType;
    }
    export interface SwapPoolToken extends IBaseToken, LPToken {
        readonly baseToken: BaseToken;
        readonly poolId: number;
        readonly poolName: string;
        readonly poolType: string;
        readonly nativeTokens?: Token[];
        readonly depositTokens?: Token[];
        readonly poolTokensForBridgeSwaps: Token[];
    }
    interface SwapTokenArgs {
        name: string;
        symbol: string;
        decimals: number | DecimalsMap;
        addresses: AddressMap;
        poolId: number;
        poolName: string;
        poolType: SwapType;
        poolTokens: Token[];
        swapAddresses: AddressMap;
    }
    interface ETHSwapTokenArgs extends SwapTokenArgs {
        nativeTokens?: Token[];
        depositTokens?: Token[];
        swapEthAddresses?: AddressMap;
    }
    export class SwapToken implements SwapPoolToken {
        readonly baseToken: BaseToken;
        readonly poolId: number;
        readonly poolName: string;
        readonly poolType: SwapType;
        readonly poolTokens: Token[];
        private readonly swapAddresses;
        constructor(args: SwapTokenArgs);
        get name(): string;
        get symbol(): string;
        get addresses(): {
            [k: number]: string;
        };
        get swapType(): SwapType;
        get hash(): symbol;
        address(chainId: number): string | null;
        decimals(chainId: number): number | null;
        get poolTokensForBridgeSwaps(): Token[];
    }
    export class ETHSwapToken extends SwapToken {
        readonly nativeTokens: Token[];
        readonly depositTokens: Token[];
        private readonly swapEthAddresses?;
        constructor(args: ETHSwapTokenArgs);
        get poolTokensForBridgeSwaps(): Token[];
    }
    export const ETH_POOL_SWAP_TOKEN: SwapToken;
    export const OPTIMISM_ETH_SWAP_TOKEN: ETHSwapToken;
    export const BSC_POOL_SWAP_TOKEN: SwapToken;
    export const POLYGON_POOL_SWAP_TOKEN: SwapToken;
    export const FANTOM_POOL_SWAP_TOKEN: SwapToken;
    export const FANTOM_ETH_SWAP_TOKEN: ETHSwapToken;
    export const BOBA_POOL_SWAP_TOKEN: SwapToken;
    export const BOBA_ETH_SWAP_TOKEN: ETHSwapToken;
    export const ARBITRUM_POOL_SWAP_TOKEN: SwapToken;
    export const ARBITRUM_ETH_SWAP_TOKEN: ETHSwapToken;
    export const AVALANCHE_POOL_SWAP_TOKEN: SwapToken;
    export const AVALANCHE_ETH_SWAP_TOKEN: ETHSwapToken;
    export const AURORA_POOL_SWAP_TOKEN: SwapToken;
    export const HARMONY_POOL_SWAP_TOKEN: SwapToken;
    export const HARMONY_ONEETH_TOKEN: ETHSwapToken;
    export interface SwapGroupTokenMap {
        [grp: string]: Token[];
    }
    export interface BridgeTokensBySwapGroupMap {
        [c: number]: SwapGroupTokenMap;
    }
    export const bridgeSwappableTokensByType: BridgeTokensBySwapGroupMap;
    interface SwapTypePoolTokens {
        [s: string]: {
            poolTokens: Token[];
        };
    }
    export const bridgeSwappableTypePoolsByChain: {
        [x: number]: SwapTypePoolTokens;
    };
    export function getAllSwappableTokensForNetwork(chainId: number): Token[];
    export const swapGroupsForNetwork: (chainId: number) => string[];
    export function stableswapPoolForNetwork(chainId: number): SwapPoolToken;
    export function ethSwapPoolForNetwork(chainId: number): SwapPoolToken;
    export {};
}
export interface NetworkSwappableTokensMap {
    [c: number]: Token[];
}
export interface AllNetworksSwappableTokensMap {
    [c: number]: NetworkSwappableTokensMap;
}
/**
 * @deprecated Use {@link networkSwapTokensMap} instead.
 */
export declare function swappableTokens(chainIdA: number, chainIdB?: number): NetworkSwappableTokensMap;
/**
 * Returns a map of swappable tokens for two given networks; or, if a second chainid isn't passed,
 * a map of all swappable tokens for the passed chainid between all supported networks.
 * @param chainIdA
 * @param chainIdB Optional second network; if passed, a map of swappable tokens between ONLY chainIdA and chainIdB is returned.
 * @return NetworkSwappableTokensMap
 */
export declare function networkSwapTokensMap(chainIdA: number, chainIdB?: number): NetworkSwappableTokensMap;
/**
 * @deprecated Use {@link allNetworksSwapTokensMap} instead.
 */
export declare function swappableTokensAllNetworks(): AllNetworksSwappableTokensMap;
/**
 * Returns map of all swappable tokens between all supported networks.
 * @return AllNetworksSwappableTokensMap
 */
export declare function allNetworksSwapTokensMap(): AllNetworksSwappableTokensMap;
