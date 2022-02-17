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
export declare class BaseToken implements Token {
    readonly name: string;
    readonly symbol: string;
    readonly addresses: AddressMap;
    readonly swapType: SwapType;
    readonly isETH: boolean;
    readonly hash: symbol;
    private readonly wrapperAddresses;
    protected readonly _decimals: DecimalsMap;
    constructor(args: {
        name: string;
        symbol: string;
        decimals: number | DecimalsMap;
        addresses: AddressMap;
        swapType: SwapType;
        isETH?: boolean;
        wrapperAddresses?: AddressMap;
    });
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
