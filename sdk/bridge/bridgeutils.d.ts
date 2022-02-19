import type { Token } from "../token";
import type { GenericZapBridgeContract } from "../contracts";
import { BigNumber } from "@ethersproject/bignumber";
export declare namespace BridgeUtils {
    export const isL2ETHChain: (chainId: number) => boolean;
    interface DepositIfChainArgs {
        chainId: number;
        tokens: Token[];
        depositEth: boolean;
        altChainId?: number;
    }
    export const DepositIfChainTokens: DepositIfChainArgs[];
    interface BridgeTxArgs {
        slippageCustom: string;
        slippageSelected: string;
        infiniteApproval: boolean;
        transactionDeadline: number;
        bridgeTransactionDeadline: number;
    }
    export const getBridgeTxArgs: () => BridgeTxArgs;
    interface BridgeSlippages {
        slippageSelected: string;
        transactionDeadline: number;
        bridgeTransactionDeadline: number;
        minToSwapOrigin: BigNumber;
        minToSwapDest: BigNumber;
        minToSwapDestFromOrigin: BigNumber;
        minToSwapOriginMediumSlippage: BigNumber;
        minToSwapDestMediumSlippage: BigNumber;
        minToSwapDestFromOriginMediumSlippage: BigNumber;
        minToSwapOriginHighSlippage: BigNumber;
        minToSwapDestHighSlippage: BigNumber;
        minToSwapDestFromOriginHighSlippage: BigNumber;
    }
    export function getSlippages(amountFrom: BigNumber, amountTo: BigNumber): BridgeSlippages;
    export const subBigNumSafe: (a: BigNumber, b: BigNumber) => BigNumber;
    export const getTimeMinutesFromNow: (minutesFromNow: number) => number;
    export interface BridgeTxParams {
        addressTo: string;
        chainIdTo: number;
        amountFrom: BigNumber;
    }
    export const makeEasyParams: (args: BridgeTxParams, chainId: number, t: Token) => [string, number, string, BigNumber];
    export const makeEasySubParams: (args: BridgeTxParams, chainId: number, t: Token) => [string, number, string];
    export const depositETHParams: (args: BridgeTxParams) => [string, number, BigNumber];
    export function calculateSwapL2Zap(zapBridge: GenericZapBridgeContract, intermediateToken: string, tokenIndexFrom: number, tokenIndexTo: number, amount: BigNumber): Promise<BigNumber>;
    export const isETHLikeToken: (t: Token) => boolean;
    export const makeOverrides: (value: BigNumber, withValue: boolean) => any;
    export {};
}
