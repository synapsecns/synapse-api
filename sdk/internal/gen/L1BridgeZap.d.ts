import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface L1BridgeZapInterface extends utils.Interface {
    contractName: "L1BridgeZap";
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
    contractName: "L1BridgeZap";
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
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            availableTokenAmount: BigNumber;
        }>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Wraps SynapseBridge deposit() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Wraps SynapseBridge depositAndSwap() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Wraps SynapseBridge deposit() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         */
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Wraps SynapseBridge depositAndSwap() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Wraps SynapseBridge redeem() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to redeem into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Combines adding liquidity to the given Swap, and calls deposit() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Combines adding liquidity to the given Swap, and calls depositAndSwap() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param liqDeadline latest timestamp to accept this transaction
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param swapDeadline latest timestamp to accept this transaction*
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;
    baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    /**
     * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
     * @param tokenAmount the amount of LP token to burn
     * @param tokenIndex index of which token will be withdrawn
     */
    calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * This shouldn't be used outside frontends for user estimates.
     * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
     * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision.
     * @param deposit whether this is a deposit or a withdrawal
     */
    calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Wraps SynapseBridge deposit() function
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
     * @param chainId which chain to bridge assets onto
     * @param to address on other chain to bridge assets to
     * @param token ERC20 compatible token to deposit into the bridge
     */
    deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Wraps SynapseBridge depositAndSwap() function
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees
     * @param chainId which chain to bridge assets onto
     * @param deadline latest timestamp to accept this transaction*
     * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
     * @param to address on other chain to bridge assets to
     * @param token ERC20 compatible token to deposit into the bridge
     * @param tokenIndexFrom the token the user wants to swap from
     * @param tokenIndexTo the token the user wants to swap to
     */
    depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Wraps SynapseBridge deposit() function to make it compatible w/ ETH -> WETH conversions
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
     * @param chainId which chain to bridge assets onto
     * @param to address on other chain to bridge assets to
     */
    depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Wraps SynapseBridge depositAndSwap() function to make it compatible w/ ETH -> WETH conversions
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees
     * @param chainId which chain to bridge assets onto
     * @param deadline latest timestamp to accept this transaction*
     * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
     * @param to address on other chain to bridge assets to
     * @param tokenIndexFrom the token the user wants to swap from
     * @param tokenIndexTo the token the user wants to swap to
     */
    depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Wraps SynapseBridge redeem() function
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
     * @param chainId which chain to bridge assets onto
     * @param to address on other chain to bridge assets to
     * @param token ERC20 compatible token to redeem into the bridge
     */
    redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Combines adding liquidity to the given Swap, and calls deposit() on the bridge using that LP token
     * @param chainId which chain to bridge assets onto
     * @param deadline latest timestamp to accept this transaction*
     * @param liquidityAmounts the amounts of each token to add, in their native precision
     * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
     * @param to address on other chain to bridge assets to
     * @param token ERC20 compatible token to deposit into the bridge
     */
    zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Combines adding liquidity to the given Swap, and calls depositAndSwap() on the bridge using that LP token
     * @param chainId which chain to bridge assets onto
     * @param liqDeadline latest timestamp to accept this transaction
     * @param liquidityAmounts the amounts of each token to add, in their native precision
     * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
     * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
     * @param swapDeadline latest timestamp to accept this transaction*
     * @param to address on other chain to bridge assets to
     * @param token ERC20 compatible token to deposit into the bridge
     * @param tokenIndexFrom the token the user wants to swap from
     * @param tokenIndexTo the token the user wants to swap to
     */
    zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;
        baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Wraps SynapseBridge deposit() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Wraps SynapseBridge depositAndSwap() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Wraps SynapseBridge deposit() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         */
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Wraps SynapseBridge depositAndSwap() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Wraps SynapseBridge redeem() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to redeem into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Combines adding liquidity to the given Swap, and calls deposit() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Combines adding liquidity to the given Swap, and calls depositAndSwap() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param liqDeadline latest timestamp to accept this transaction
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param swapDeadline latest timestamp to accept this transaction*
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        WETH_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
        baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Wraps SynapseBridge deposit() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Wraps SynapseBridge depositAndSwap() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Wraps SynapseBridge deposit() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         */
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Wraps SynapseBridge depositAndSwap() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Wraps SynapseBridge redeem() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to redeem into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Combines adding liquidity to the given Swap, and calls deposit() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Combines adding liquidity to the given Swap, and calls depositAndSwap() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param liqDeadline latest timestamp to accept this transaction
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param swapDeadline latest timestamp to accept this transaction*
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        WETH_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        baseTokens(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Wraps SynapseBridge deposit() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Wraps SynapseBridge depositAndSwap() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Wraps SynapseBridge deposit() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         */
        depositETH(to: string, chainId: BigNumberish, amount: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Wraps SynapseBridge depositAndSwap() function to make it compatible w/ ETH -> WETH conversions
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to bridge assets to
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        depositETHAndSwap(to: string, chainId: BigNumberish, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Wraps SynapseBridge redeem() function
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to redeem into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Combines adding liquidity to the given Swap, and calls deposit() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        zapAndDeposit(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Combines adding liquidity to the given Swap, and calls depositAndSwap() on the bridge using that LP token
         * @param chainId which chain to bridge assets onto
         * @param liqDeadline latest timestamp to accept this transaction
         * @param liquidityAmounts the amounts of each token to add, in their native precision
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         * @param swapDeadline latest timestamp to accept this transaction*
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        zapAndDepositAndSwap(to: string, chainId: BigNumberish, token: string, liquidityAmounts: BigNumberish[], minToMint: BigNumberish, liqDeadline: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
