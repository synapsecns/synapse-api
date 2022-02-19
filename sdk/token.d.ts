import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import type { AddressMap, DecimalsMap } from "./common/types";
import type { SwapType } from "./internal/swaptype";
export interface IBaseToken {
    readonly name: string;
    readonly symbol: string;
    readonly addresses: AddressMap;
    readonly swapType: SwapType;
    readonly hash: symbol;
    address: (chainId: number) => string | null;
    decimals: (chainId: number) => number | null;
}
export interface Token extends IBaseToken {
    isWrappedToken: boolean;
    underlyingToken?: Token;
    isEqual: (other: Token) => boolean;
    valueToWei: (amt: BigNumberish, chainId: number) => BigNumber;
    wrapperAddress: (chainId: number) => string | null;
}
/**
 * Token represents an ERC20 token on Ethereum-based blockchains.
 */
export declare class BaseToken implements Token {
    readonly name: string;
    readonly symbol: string;
    readonly addresses: AddressMap;
    readonly swapType: SwapType;
    readonly isETH: boolean;
    readonly hash: symbol;
    private readonly wrapperAddresses;
    protected readonly _decimals: DecimalsMap;
    /**
     * Creates a new Token object with the defined arguments.
     * @param {Object} args Information about this token, including name, symbol, decimals, and
     * contract addresses.
     * @param {string} args.name Name of the token (example, "USD Circle")
     * @param {string} args.symbol Symbol of the token (example, "USDC")
     * @param {number|Object} args.decimals Either a single value, representing the token's ERC20 decimals value on all chains, or
     * a map in the format of { chain id => decimals for chain }.
     * If the latter is passed, values for ALL known chains must be provided.
     * @param {Object} args.addresses Mapping in the format of { chain id => address of token on chain },
     * providing the address of this token on different chains.
     * @param {SwapType} args.swapType Swap type of this token
     */
    constructor(args: {
        name: string;
        symbol: string;
        decimals: number | DecimalsMap;
        addresses: AddressMap;
        swapType: SwapType;
        isETH?: boolean;
        wrapperAddresses?: AddressMap;
    });
    /**
     * Returns the address of this token on a given network, or null if
     * the token does not exist on the passed network.
     * @param {number} chainId Chain ID
     * @return {string|null} Token's contract address for the queried network, or null
     */
    address(chainId: number): string | null;
    wrapperAddress(chainId: number): string | null;
    decimals(chainId: number): number | null;
    isEqual(other: Token): boolean;
    valueToWei(amt: BigNumberish, chainId: number): BigNumber;
    get isWrappedToken(): boolean;
}
export declare class WrappedToken extends BaseToken {
    readonly underlyingToken: BaseToken;
    constructor(args: {
        name: string;
        symbol: string;
        decimals: number | DecimalsMap;
        addresses: AddressMap;
        swapType: SwapType;
        underlyingToken: BaseToken;
        isETH?: boolean;
        wrapperAddresses?: AddressMap;
    });
    get isWrappedToken(): boolean;
}
