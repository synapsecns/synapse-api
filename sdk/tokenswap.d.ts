import { Token } from "./token";
import { PopulatedTransaction } from "@ethersproject/contracts";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
export declare namespace UnsupportedSwapErrors {
    interface Tok {
        symbol: string;
    }
    export enum UnsupportedSwapErrorKind {
        UnsupportedToken = 0,
        UnsupportedTokenNetFrom = 1,
        UnsupportedTokenNetTo = 2,
        NonmatchingSwapTypes = 3,
        BobaToL1 = 4,
        ETHOnBoba = 5
    }
    export interface UnsupportedSwapError {
        errorKind: UnsupportedSwapErrorKind;
        reason: string;
    }
    export const tokenNotSupported: (t: Tok, netName: string) => UnsupportedSwapError;
    export const tokenNotSupportedNetFrom: (t: Tok, netName: string) => UnsupportedSwapError;
    export const tokenNotSupportedNetTo: (t: Tok, netName: string) => UnsupportedSwapError;
    export const nonMatchingSwapTypes: (st1: string, st2: string) => UnsupportedSwapError;
    export const ethOnBoba: () => UnsupportedSwapError;
    export const bobaToL1: () => UnsupportedSwapError;
    export {};
}
export declare namespace TokenSwap {
    interface SwapParams {
        chainId: number;
        tokenFrom: Token;
        tokenTo: Token;
        amountIn: BigNumberish;
    }
    interface SwapTokensParams extends SwapParams {
        minAmountOut: BigNumberish;
        deadline?: number;
    }
    interface BridgeSwapSupportedParams {
        tokenFrom: Token;
        tokenTo: Token;
        chainIdFrom: number;
        chainIdTo: number;
    }
    interface EstimatedSwapRate {
        amountOut: BigNumber;
    }
    interface IntermediateSwapTokens {
        intermediateToken?: Token;
        bridgeConfigIntermediateToken: Token;
    }
    interface SwapSupportedResult {
        swapSupported: boolean;
        reasonNotSupported?: UnsupportedSwapErrors.UnsupportedSwapError;
    }
    interface DetailedTokenSwapMap {
        [chainId: number]: {
            token: Token;
            [chainId: number]: Token[];
        }[];
    }
    function swapSupported(args: SwapParams): SwapSupportedResult;
    function bridgeSwapSupported(args: BridgeSwapSupportedParams): SwapSupportedResult;
    function calculateSwapRate(args: SwapParams): Promise<EstimatedSwapRate>;
    function buildSwapTokensTransaction(args: SwapTokensParams): Promise<PopulatedTransaction>;
    function intermediateTokens(chainId: number, token: Token): IntermediateSwapTokens;
    function detailedTokenSwapMap(): DetailedTokenSwapMap;
}
