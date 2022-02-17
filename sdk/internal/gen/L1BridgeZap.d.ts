import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface L1BridgeZapInterface extends ethers.utils.Interface {
    functions: {
        "WETH_ADDRESS()": FunctionFragment;
        "baseTokens(uint256)": FunctionFragment;
        "calculateRemoveLiquidityOneToken(uint256,uint8)": FunctionFragment;
        "calculateTokenAmount(uint256[],bool)": FunctionFragment;
        "deposit(address,uint256,address,uint256)": FunctionFragment;
        "depositAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": FunctionFragment;
        "depositETH(address,uint256,uint256)": FunctionFragment;
        "depositETHAndSwap(address,uint256,uint256,uint8,uint8,uint256,uint256)": FunctionFragment;
        "redeem(address,uint256,address,uint256)": FunctionFragment;
        "zapAndDeposit(address,uint256,address,uint256[],uint256,uint256)": FunctionFragment;
        "zapAndDepositAndSwap(address,uint256,address,uint256[],uint256,uint256,uint8,uint8,uint256,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "WETH_ADDRESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "baseTokens", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateRemoveLiquidityOneToken", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateTokenAmount", values: [BigNumberish[], boolean]): string;
    encodeFunctionData(functionFragment: "deposit", values: [string, BigNumberish, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "depositAndSwap", values: [
        string,
        BigNumberish,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "depositETH", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "depositETHAndSwap", values: [
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "redeem", values: [string, BigNumberish, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "zapAndDeposit", values: [
        string,
        BigNumberish,
        string,
        BigNumberish[],
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "zapAndDepositAndSwap", values: [
        string,
        BigNumberish,
        string,
        BigNumberish[],
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "WETH_ADDRESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "baseTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateRemoveLiquidityOneToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateTokenAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositAndSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositETHAndSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "zapAndDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "zapAndDepositAndSwap", data: BytesLike): Result;
    events: {};
}
export interface L1BridgeZap extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: L1BridgeZapInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        WETH_ADDRESS(overrides?: CallOverrides): Promise<[string]>;
        baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            availableTokenAmount: BigNumber;
        }>;
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<[BigNumber]>;
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;
    baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
    deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;
        baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        WETH_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
        baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        WETH_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
