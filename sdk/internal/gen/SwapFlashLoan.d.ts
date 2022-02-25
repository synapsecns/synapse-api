import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface SwapFlashLoanInterface extends utils.Interface {
    contractName: "SwapFlashLoan";
    functions: {
        "MAX_BPS()": FunctionFragment;
        "addLiquidity(uint256[],uint256,uint256)": FunctionFragment;
        "calculateRemoveLiquidity(uint256)": FunctionFragment;
        "calculateRemoveLiquidityOneToken(uint256,uint8)": FunctionFragment;
        "calculateSwap(uint8,uint8,uint256)": FunctionFragment;
        "calculateTokenAmount(uint256[],bool)": FunctionFragment;
        "flashLoan(address,address,uint256,bytes)": FunctionFragment;
        "flashLoanFeeBPS()": FunctionFragment;
        "getA()": FunctionFragment;
        "getAPrecise()": FunctionFragment;
        "getAdminBalance(uint256)": FunctionFragment;
        "getToken(uint8)": FunctionFragment;
        "getTokenBalance(uint8)": FunctionFragment;
        "getTokenIndex(address)": FunctionFragment;
        "getVirtualPrice()": FunctionFragment;
        "initialize(address[],uint8[],string,string,uint256,uint256,uint256,address)": FunctionFragment;
        "owner()": FunctionFragment;
        "pause()": FunctionFragment;
        "paused()": FunctionFragment;
        "protocolFeeShareBPS()": FunctionFragment;
        "rampA(uint256,uint256)": FunctionFragment;
        "removeLiquidity(uint256,uint256[],uint256)": FunctionFragment;
        "removeLiquidityImbalance(uint256[],uint256,uint256)": FunctionFragment;
        "removeLiquidityOneToken(uint256,uint8,uint256,uint256)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "setAdminFee(uint256)": FunctionFragment;
        "setFlashLoanFees(uint256,uint256)": FunctionFragment;
        "setSwapFee(uint256)": FunctionFragment;
        "stopRampA()": FunctionFragment;
        "swap(uint8,uint8,uint256,uint256,uint256)": FunctionFragment;
        "swapStorage()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "unpause()": FunctionFragment;
        "withdrawAdminFees()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "MAX_BPS", values?: undefined): string;
    encodeFunctionData(functionFragment: "addLiquidity", values: [BigNumberish[], BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateRemoveLiquidity", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateRemoveLiquidityOneToken", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateSwap", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "calculateTokenAmount", values: [BigNumberish[], boolean]): string;
    encodeFunctionData(functionFragment: "flashLoan", values: [string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "flashLoanFeeBPS", values?: undefined): string;
    encodeFunctionData(functionFragment: "getA", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAPrecise", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAdminBalance", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getToken", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getTokenBalance", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getTokenIndex", values: [string]): string;
    encodeFunctionData(functionFragment: "getVirtualPrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        string[],
        BigNumberish[],
        string,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        string
    ]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolFeeShareBPS", values?: undefined): string;
    encodeFunctionData(functionFragment: "rampA", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "removeLiquidity", values: [BigNumberish, BigNumberish[], BigNumberish]): string;
    encodeFunctionData(functionFragment: "removeLiquidityImbalance", values: [BigNumberish[], BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "removeLiquidityOneToken", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setAdminFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setFlashLoanFees", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setSwapFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "stopRampA", values?: undefined): string;
    encodeFunctionData(functionFragment: "swap", values: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "swapStorage", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawAdminFees", values?: undefined): string;
    decodeFunctionResult(functionFragment: "MAX_BPS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateRemoveLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateRemoveLiquidityOneToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateTokenAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "flashLoan", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "flashLoanFeeBPS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getA", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAPrecise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAdminBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenIndex", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getVirtualPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeeShareBPS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rampA", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeLiquidityImbalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeLiquidityOneToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAdminFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFlashLoanFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSwapFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stopRampA", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapStorage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawAdminFees", data: BytesLike): Result;
    events: {
        "AddLiquidity(address,uint256[],uint256[],uint256,uint256)": EventFragment;
        "FlashLoan(address,uint8,uint256,uint256,uint256)": EventFragment;
        "NewAdminFee(uint256)": EventFragment;
        "NewSwapFee(uint256)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Paused(address)": EventFragment;
        "RampA(uint256,uint256,uint256,uint256)": EventFragment;
        "RemoveLiquidity(address,uint256[],uint256)": EventFragment;
        "RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)": EventFragment;
        "RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)": EventFragment;
        "StopRampA(uint256,uint256)": EventFragment;
        "TokenSwap(address,uint256,uint256,uint128,uint128)": EventFragment;
        "Unpaused(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AddLiquidity"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "FlashLoan"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewAdminFee"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewSwapFee"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RampA"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveLiquidity"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveLiquidityImbalance"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemoveLiquidityOne"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "StopRampA"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenSwap"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}
export declare type AddLiquidityEvent = TypedEvent<[
    string,
    BigNumber[],
    BigNumber[],
    BigNumber,
    BigNumber
], {
    provider: string;
    tokenAmounts: BigNumber[];
    fees: BigNumber[];
    invariant: BigNumber;
    lpTokenSupply: BigNumber;
}>;
export declare type AddLiquidityEventFilter = TypedEventFilter<AddLiquidityEvent>;
export declare type FlashLoanEvent = TypedEvent<[
    string,
    number,
    BigNumber,
    BigNumber,
    BigNumber
], {
    receiver: string;
    tokenIndex: number;
    amount: BigNumber;
    amountFee: BigNumber;
    protocolFee: BigNumber;
}>;
export declare type FlashLoanEventFilter = TypedEventFilter<FlashLoanEvent>;
export declare type NewAdminFeeEvent = TypedEvent<[
    BigNumber
], {
    newAdminFee: BigNumber;
}>;
export declare type NewAdminFeeEventFilter = TypedEventFilter<NewAdminFeeEvent>;
export declare type NewSwapFeeEvent = TypedEvent<[
    BigNumber
], {
    newSwapFee: BigNumber;
}>;
export declare type NewSwapFeeEventFilter = TypedEventFilter<NewSwapFeeEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export declare type PausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type PausedEventFilter = TypedEventFilter<PausedEvent>;
export declare type RampAEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], {
    oldA: BigNumber;
    newA: BigNumber;
    initialTime: BigNumber;
    futureTime: BigNumber;
}>;
export declare type RampAEventFilter = TypedEventFilter<RampAEvent>;
export declare type RemoveLiquidityEvent = TypedEvent<[
    string,
    BigNumber[],
    BigNumber
], {
    provider: string;
    tokenAmounts: BigNumber[];
    lpTokenSupply: BigNumber;
}>;
export declare type RemoveLiquidityEventFilter = TypedEventFilter<RemoveLiquidityEvent>;
export declare type RemoveLiquidityImbalanceEvent = TypedEvent<[
    string,
    BigNumber[],
    BigNumber[],
    BigNumber,
    BigNumber
], {
    provider: string;
    tokenAmounts: BigNumber[];
    fees: BigNumber[];
    invariant: BigNumber;
    lpTokenSupply: BigNumber;
}>;
export declare type RemoveLiquidityImbalanceEventFilter = TypedEventFilter<RemoveLiquidityImbalanceEvent>;
export declare type RemoveLiquidityOneEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], {
    provider: string;
    lpTokenAmount: BigNumber;
    lpTokenSupply: BigNumber;
    boughtId: BigNumber;
    tokensBought: BigNumber;
}>;
export declare type RemoveLiquidityOneEventFilter = TypedEventFilter<RemoveLiquidityOneEvent>;
export declare type StopRampAEvent = TypedEvent<[
    BigNumber,
    BigNumber
], {
    currentA: BigNumber;
    time: BigNumber;
}>;
export declare type StopRampAEventFilter = TypedEventFilter<StopRampAEvent>;
export declare type TokenSwapEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], {
    buyer: string;
    tokensSold: BigNumber;
    tokensBought: BigNumber;
    soldId: BigNumber;
    boughtId: BigNumber;
}>;
export declare type TokenSwapEventFilter = TypedEventFilter<TokenSwapEvent>;
export declare type UnpausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
export interface SwapFlashLoan extends BaseContract {
    contractName: "SwapFlashLoan";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SwapFlashLoanInterface;
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
        MAX_BPS(overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Add liquidity to the pool with the given amounts of tokens
         * @param amounts the amounts of each token to add, in their native precision
         * @param deadline latest timestamp to accept this transaction
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         */
        addLiquidity(amounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * A simple method to calculate amount of each underlying tokens that is returned upon burning given amount of LP tokens
         * @param amount the amount of LP tokens that would be burned on withdrawal
         */
        calculateRemoveLiquidity(amount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber[]]>;
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            availableTokenAmount: BigNumber;
        }>;
        /**
         * Calculate amount of tokens you receive on swap
         * @param dx the amount of tokens the user wants to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param tokenIndexFrom the token the user wants to sell
         * @param tokenIndexTo the token the user wants to buy
         */
        calculateSwap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Borrow the specified token from this pool for this transaction only. This function will call `IFlashLoanReceiver(receiver).executeOperation` and the `receiver` must return the full amount of the token and the associated fee by the end of the callback transaction. If the conditions are not met, this call is reverted.
         * @param amount the total amount to borrow in this transaction
         * @param params optional data to pass along to the callback function
         * @param receiver the address of the receiver of the token. This address must implement the IFlashLoanReceiver interface and the callback function `executeOperation`.
         * @param token the protocol fee in bps to be applied on the total flash loan fee
         */
        flashLoan(receiver: string, token: string, amount: BigNumberish, params: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        flashLoanFeeBPS(overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * See the StableSwap paper for details
         * Return A, the amplification coefficient * n * (n - 1)
         */
        getA(overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * See the StableSwap paper for details
         * Return A in its raw precision form
         */
        getAPrecise(overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * This function reads the accumulated amount of admin fees of the token with given index
         * @param index Index of the pooled token
         */
        getAdminBalance(index: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Return address of the pooled token at given index. Reverts if tokenIndex is out of range.
         * @param index the index of the token
         */
        getToken(index: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        /**
         * Return current balance of the pooled token at given index
         * @param index the index of the token
         */
        getTokenBalance(index: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Return the index of the given token address. Reverts if no matching token is found.
         * @param tokenAddress address of the token
         */
        getTokenIndex(tokenAddress: string, overrides?: CallOverrides): Promise<[number]>;
        /**
         * Get the virtual price, to help calculate profit
         */
        getVirtualPrice(overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Initializes this Swap contract with the given parameters. This will also clone a LPToken contract that represents users' LP positions. The owner of LPToken will be this contract - which means only this contract is allowed to mint/burn tokens.
         * @param _a the amplification coefficient * n * (n - 1). See the StableSwap paper for details
         * @param _adminFee default adminFee to be initialized with
         * @param _fee default swap fee to be initialized with
         * @param _pooledTokens an array of ERC20s this pool will accept
         * @param decimals the decimals to use for each pooled token, eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS
         * @param lpTokenName the long-form name of the token to be deployed
         * @param lpTokenSymbol the short symbol for the token to be deployed
         * @param lpTokenTargetAddress the address of an existing LPToken contract to use as a target
         */
        initialize(_pooledTokens: string[], decimals: BigNumberish[], lpTokenName: string, lpTokenSymbol: string, _a: BigNumberish, _fee: BigNumberish, _adminFee: BigNumberish, lpTokenTargetAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Returns the address of the current owner.
         */
        owner(overrides?: CallOverrides): Promise<[string]>;
        /**
         * Pause the contract. Revert if already paused.
         */
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        protocolFeeShareBPS(overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Start ramping up or down A parameter towards given futureA and futureTime Checks if the change is too rapid, and commits the new A value only when it falls under the limit range.
         * @param futureA the new A to ramp towards
         * @param futureTime timestamp when the new A should be reached
         */
        rampA(futureA: BigNumberish, futureTime: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Liquidity can always be removed, even when the pool is paused.
         * Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amount the amount of LP tokens to burn
         * @param deadline latest timestamp to accept this transaction
         * @param minAmounts the minimum amounts of each token in the pool acceptable for this burn. Useful as a front-running mitigation
         */
        removeLiquidity(amount: BigNumberish, minAmounts: BigNumberish[], deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Remove liquidity from the pool, weighted differently than the pool's current balances. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amounts how much of each token to withdraw
         * @param deadline latest timestamp to accept this transaction
         * @param maxBurnAmount the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation.
         */
        removeLiquidityImbalance(amounts: BigNumberish[], maxBurnAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Remove liquidity from the pool all in one token. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param deadline latest timestamp to accept this transaction
         * @param minAmount the minimum amount to withdraw, otherwise revert
         * @param tokenAmount the amount of the token you want to receive
         * @param tokenIndex the index of the token you want to receive
         */
        removeLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, minAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
         */
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Update the admin fee. Admin fee takes portion of the swap fee.
         * @param newAdminFee new admin fee to be applied on future transactions
         */
        setAdminFee(newAdminFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Updates the flash loan fee parameters. This function can only be called by the owner.
         * @param newFlashLoanFeeBPS the total fee in bps to be applied on future flash loans
         * @param newProtocolFeeShareBPS the protocol fee in bps to be applied on the total flash loan fee
         */
        setFlashLoanFees(newFlashLoanFeeBPS: BigNumberish, newProtocolFeeShareBPS: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Update the swap fee to be applied on swaps
         * @param newSwapFee new swap fee to be applied on future transactions
         */
        setSwapFee(newSwapFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Stop ramping A immediately. Reverts if ramp A is already stopped.
         */
        stopRampA(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Swap two tokens using this pool
         * @param deadline latest timestamp to accept this transaction
         * @param dx the amount of tokens the user wants to swap from
         * @param minDy the min amount the user would like to receive, or revert.
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        swap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        swapStorage(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            string
        ] & {
            initialA: BigNumber;
            futureA: BigNumber;
            initialATime: BigNumber;
            futureATime: BigNumber;
            swapFee: BigNumber;
            adminFee: BigNumber;
            lpToken: string;
        }>;
        /**
         * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
         */
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Unpause the contract. Revert if already unpaused.
         */
        unpause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Withdraw all admin fees to the contract owner
         */
        withdrawAdminFees(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    MAX_BPS(overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Add liquidity to the pool with the given amounts of tokens
     * @param amounts the amounts of each token to add, in their native precision
     * @param deadline latest timestamp to accept this transaction
     * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
     */
    addLiquidity(amounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * A simple method to calculate amount of each underlying tokens that is returned upon burning given amount of LP tokens
     * @param amount the amount of LP tokens that would be burned on withdrawal
     */
    calculateRemoveLiquidity(amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
    /**
     * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
     * @param tokenAmount the amount of LP token to burn
     * @param tokenIndex index of which token will be withdrawn
     */
    calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Calculate amount of tokens you receive on swap
     * @param dx the amount of tokens the user wants to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee.
     * @param tokenIndexFrom the token the user wants to sell
     * @param tokenIndexTo the token the user wants to buy
     */
    calculateSwap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * This shouldn't be used outside frontends for user estimates.
     * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
     * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee.
     * @param deposit whether this is a deposit or a withdrawal
     */
    calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Borrow the specified token from this pool for this transaction only. This function will call `IFlashLoanReceiver(receiver).executeOperation` and the `receiver` must return the full amount of the token and the associated fee by the end of the callback transaction. If the conditions are not met, this call is reverted.
     * @param amount the total amount to borrow in this transaction
     * @param params optional data to pass along to the callback function
     * @param receiver the address of the receiver of the token. This address must implement the IFlashLoanReceiver interface and the callback function `executeOperation`.
     * @param token the protocol fee in bps to be applied on the total flash loan fee
     */
    flashLoan(receiver: string, token: string, amount: BigNumberish, params: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    flashLoanFeeBPS(overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * See the StableSwap paper for details
     * Return A, the amplification coefficient * n * (n - 1)
     */
    getA(overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * See the StableSwap paper for details
     * Return A in its raw precision form
     */
    getAPrecise(overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * This function reads the accumulated amount of admin fees of the token with given index
     * @param index Index of the pooled token
     */
    getAdminBalance(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Return address of the pooled token at given index. Reverts if tokenIndex is out of range.
     * @param index the index of the token
     */
    getToken(index: BigNumberish, overrides?: CallOverrides): Promise<string>;
    /**
     * Return current balance of the pooled token at given index
     * @param index the index of the token
     */
    getTokenBalance(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Return the index of the given token address. Reverts if no matching token is found.
     * @param tokenAddress address of the token
     */
    getTokenIndex(tokenAddress: string, overrides?: CallOverrides): Promise<number>;
    /**
     * Get the virtual price, to help calculate profit
     */
    getVirtualPrice(overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Initializes this Swap contract with the given parameters. This will also clone a LPToken contract that represents users' LP positions. The owner of LPToken will be this contract - which means only this contract is allowed to mint/burn tokens.
     * @param _a the amplification coefficient * n * (n - 1). See the StableSwap paper for details
     * @param _adminFee default adminFee to be initialized with
     * @param _fee default swap fee to be initialized with
     * @param _pooledTokens an array of ERC20s this pool will accept
     * @param decimals the decimals to use for each pooled token, eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS
     * @param lpTokenName the long-form name of the token to be deployed
     * @param lpTokenSymbol the short symbol for the token to be deployed
     * @param lpTokenTargetAddress the address of an existing LPToken contract to use as a target
     */
    initialize(_pooledTokens: string[], decimals: BigNumberish[], lpTokenName: string, lpTokenSymbol: string, _a: BigNumberish, _fee: BigNumberish, _adminFee: BigNumberish, lpTokenTargetAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;
    /**
     * Pause the contract. Revert if already paused.
     */
    pause(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Returns true if the contract is paused, and false otherwise.
     */
    paused(overrides?: CallOverrides): Promise<boolean>;
    protocolFeeShareBPS(overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Start ramping up or down A parameter towards given futureA and futureTime Checks if the change is too rapid, and commits the new A value only when it falls under the limit range.
     * @param futureA the new A to ramp towards
     * @param futureTime timestamp when the new A should be reached
     */
    rampA(futureA: BigNumberish, futureTime: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Liquidity can always be removed, even when the pool is paused.
     * Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
     * @param amount the amount of LP tokens to burn
     * @param deadline latest timestamp to accept this transaction
     * @param minAmounts the minimum amounts of each token in the pool acceptable for this burn. Useful as a front-running mitigation
     */
    removeLiquidity(amount: BigNumberish, minAmounts: BigNumberish[], deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Remove liquidity from the pool, weighted differently than the pool's current balances. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
     * @param amounts how much of each token to withdraw
     * @param deadline latest timestamp to accept this transaction
     * @param maxBurnAmount the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation.
     */
    removeLiquidityImbalance(amounts: BigNumberish[], maxBurnAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Remove liquidity from the pool all in one token. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
     * @param deadline latest timestamp to accept this transaction
     * @param minAmount the minimum amount to withdraw, otherwise revert
     * @param tokenAmount the amount of the token you want to receive
     * @param tokenIndex the index of the token you want to receive
     */
    removeLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, minAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Update the admin fee. Admin fee takes portion of the swap fee.
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    setAdminFee(newAdminFee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Updates the flash loan fee parameters. This function can only be called by the owner.
     * @param newFlashLoanFeeBPS the total fee in bps to be applied on future flash loans
     * @param newProtocolFeeShareBPS the protocol fee in bps to be applied on the total flash loan fee
     */
    setFlashLoanFees(newFlashLoanFeeBPS: BigNumberish, newProtocolFeeShareBPS: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Update the swap fee to be applied on swaps
     * @param newSwapFee new swap fee to be applied on future transactions
     */
    setSwapFee(newSwapFee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Stop ramping A immediately. Reverts if ramp A is already stopped.
     */
    stopRampA(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Swap two tokens using this pool
     * @param deadline latest timestamp to accept this transaction
     * @param dx the amount of tokens the user wants to swap from
     * @param minDy the min amount the user would like to receive, or revert.
     * @param tokenIndexFrom the token the user wants to swap from
     * @param tokenIndexTo the token the user wants to swap to
     */
    swap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    swapStorage(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string
    ] & {
        initialA: BigNumber;
        futureA: BigNumber;
        initialATime: BigNumber;
        futureATime: BigNumber;
        swapFee: BigNumber;
        adminFee: BigNumber;
        lpToken: string;
    }>;
    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Unpause the contract. Revert if already unpaused.
     */
    unpause(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Withdraw all admin fees to the contract owner
     */
    withdrawAdminFees(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        MAX_BPS(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Add liquidity to the pool with the given amounts of tokens
         * @param amounts the amounts of each token to add, in their native precision
         * @param deadline latest timestamp to accept this transaction
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         */
        addLiquidity(amounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * A simple method to calculate amount of each underlying tokens that is returned upon burning given amount of LP tokens
         * @param amount the amount of LP tokens that would be burned on withdrawal
         */
        calculateRemoveLiquidity(amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Calculate amount of tokens you receive on swap
         * @param dx the amount of tokens the user wants to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param tokenIndexFrom the token the user wants to sell
         * @param tokenIndexTo the token the user wants to buy
         */
        calculateSwap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Borrow the specified token from this pool for this transaction only. This function will call `IFlashLoanReceiver(receiver).executeOperation` and the `receiver` must return the full amount of the token and the associated fee by the end of the callback transaction. If the conditions are not met, this call is reverted.
         * @param amount the total amount to borrow in this transaction
         * @param params optional data to pass along to the callback function
         * @param receiver the address of the receiver of the token. This address must implement the IFlashLoanReceiver interface and the callback function `executeOperation`.
         * @param token the protocol fee in bps to be applied on the total flash loan fee
         */
        flashLoan(receiver: string, token: string, amount: BigNumberish, params: BytesLike, overrides?: CallOverrides): Promise<void>;
        flashLoanFeeBPS(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * See the StableSwap paper for details
         * Return A, the amplification coefficient * n * (n - 1)
         */
        getA(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * See the StableSwap paper for details
         * Return A in its raw precision form
         */
        getAPrecise(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This function reads the accumulated amount of admin fees of the token with given index
         * @param index Index of the pooled token
         */
        getAdminBalance(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Return address of the pooled token at given index. Reverts if tokenIndex is out of range.
         * @param index the index of the token
         */
        getToken(index: BigNumberish, overrides?: CallOverrides): Promise<string>;
        /**
         * Return current balance of the pooled token at given index
         * @param index the index of the token
         */
        getTokenBalance(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Return the index of the given token address. Reverts if no matching token is found.
         * @param tokenAddress address of the token
         */
        getTokenIndex(tokenAddress: string, overrides?: CallOverrides): Promise<number>;
        /**
         * Get the virtual price, to help calculate profit
         */
        getVirtualPrice(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Initializes this Swap contract with the given parameters. This will also clone a LPToken contract that represents users' LP positions. The owner of LPToken will be this contract - which means only this contract is allowed to mint/burn tokens.
         * @param _a the amplification coefficient * n * (n - 1). See the StableSwap paper for details
         * @param _adminFee default adminFee to be initialized with
         * @param _fee default swap fee to be initialized with
         * @param _pooledTokens an array of ERC20s this pool will accept
         * @param decimals the decimals to use for each pooled token, eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS
         * @param lpTokenName the long-form name of the token to be deployed
         * @param lpTokenSymbol the short symbol for the token to be deployed
         * @param lpTokenTargetAddress the address of an existing LPToken contract to use as a target
         */
        initialize(_pooledTokens: string[], decimals: BigNumberish[], lpTokenName: string, lpTokenSymbol: string, _a: BigNumberish, _fee: BigNumberish, _adminFee: BigNumberish, lpTokenTargetAddress: string, overrides?: CallOverrides): Promise<void>;
        /**
         * Returns the address of the current owner.
         */
        owner(overrides?: CallOverrides): Promise<string>;
        /**
         * Pause the contract. Revert if already paused.
         */
        pause(overrides?: CallOverrides): Promise<void>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<boolean>;
        protocolFeeShareBPS(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Start ramping up or down A parameter towards given futureA and futureTime Checks if the change is too rapid, and commits the new A value only when it falls under the limit range.
         * @param futureA the new A to ramp towards
         * @param futureTime timestamp when the new A should be reached
         */
        rampA(futureA: BigNumberish, futureTime: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Liquidity can always be removed, even when the pool is paused.
         * Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amount the amount of LP tokens to burn
         * @param deadline latest timestamp to accept this transaction
         * @param minAmounts the minimum amounts of each token in the pool acceptable for this burn. Useful as a front-running mitigation
         */
        removeLiquidity(amount: BigNumberish, minAmounts: BigNumberish[], deadline: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
        /**
         * Remove liquidity from the pool, weighted differently than the pool's current balances. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amounts how much of each token to withdraw
         * @param deadline latest timestamp to accept this transaction
         * @param maxBurnAmount the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation.
         */
        removeLiquidityImbalance(amounts: BigNumberish[], maxBurnAmount: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Remove liquidity from the pool all in one token. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param deadline latest timestamp to accept this transaction
         * @param minAmount the minimum amount to withdraw, otherwise revert
         * @param tokenAmount the amount of the token you want to receive
         * @param tokenIndex the index of the token you want to receive
         */
        removeLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, minAmount: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
         */
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        /**
         * Update the admin fee. Admin fee takes portion of the swap fee.
         * @param newAdminFee new admin fee to be applied on future transactions
         */
        setAdminFee(newAdminFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Updates the flash loan fee parameters. This function can only be called by the owner.
         * @param newFlashLoanFeeBPS the total fee in bps to be applied on future flash loans
         * @param newProtocolFeeShareBPS the protocol fee in bps to be applied on the total flash loan fee
         */
        setFlashLoanFees(newFlashLoanFeeBPS: BigNumberish, newProtocolFeeShareBPS: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Update the swap fee to be applied on swaps
         * @param newSwapFee new swap fee to be applied on future transactions
         */
        setSwapFee(newSwapFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Stop ramping A immediately. Reverts if ramp A is already stopped.
         */
        stopRampA(overrides?: CallOverrides): Promise<void>;
        /**
         * Swap two tokens using this pool
         * @param deadline latest timestamp to accept this transaction
         * @param dx the amount of tokens the user wants to swap from
         * @param minDy the min amount the user would like to receive, or revert.
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        swap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        swapStorage(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            string
        ] & {
            initialA: BigNumber;
            futureA: BigNumber;
            initialATime: BigNumber;
            futureATime: BigNumber;
            swapFee: BigNumber;
            adminFee: BigNumber;
            lpToken: string;
        }>;
        /**
         * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
         */
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        /**
         * Unpause the contract. Revert if already unpaused.
         */
        unpause(overrides?: CallOverrides): Promise<void>;
        /**
         * Withdraw all admin fees to the contract owner
         */
        withdrawAdminFees(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AddLiquidity(address,uint256[],uint256[],uint256,uint256)"(provider?: string | null, tokenAmounts?: null, fees?: null, invariant?: null, lpTokenSupply?: null): AddLiquidityEventFilter;
        AddLiquidity(provider?: string | null, tokenAmounts?: null, fees?: null, invariant?: null, lpTokenSupply?: null): AddLiquidityEventFilter;
        "FlashLoan(address,uint8,uint256,uint256,uint256)"(receiver?: string | null, tokenIndex?: null, amount?: null, amountFee?: null, protocolFee?: null): FlashLoanEventFilter;
        FlashLoan(receiver?: string | null, tokenIndex?: null, amount?: null, amountFee?: null, protocolFee?: null): FlashLoanEventFilter;
        "NewAdminFee(uint256)"(newAdminFee?: null): NewAdminFeeEventFilter;
        NewAdminFee(newAdminFee?: null): NewAdminFeeEventFilter;
        "NewSwapFee(uint256)"(newSwapFee?: null): NewSwapFeeEventFilter;
        NewSwapFee(newSwapFee?: null): NewSwapFeeEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        "Paused(address)"(account?: null): PausedEventFilter;
        Paused(account?: null): PausedEventFilter;
        "RampA(uint256,uint256,uint256,uint256)"(oldA?: null, newA?: null, initialTime?: null, futureTime?: null): RampAEventFilter;
        RampA(oldA?: null, newA?: null, initialTime?: null, futureTime?: null): RampAEventFilter;
        "RemoveLiquidity(address,uint256[],uint256)"(provider?: string | null, tokenAmounts?: null, lpTokenSupply?: null): RemoveLiquidityEventFilter;
        RemoveLiquidity(provider?: string | null, tokenAmounts?: null, lpTokenSupply?: null): RemoveLiquidityEventFilter;
        "RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)"(provider?: string | null, tokenAmounts?: null, fees?: null, invariant?: null, lpTokenSupply?: null): RemoveLiquidityImbalanceEventFilter;
        RemoveLiquidityImbalance(provider?: string | null, tokenAmounts?: null, fees?: null, invariant?: null, lpTokenSupply?: null): RemoveLiquidityImbalanceEventFilter;
        "RemoveLiquidityOne(address,uint256,uint256,uint256,uint256)"(provider?: string | null, lpTokenAmount?: null, lpTokenSupply?: null, boughtId?: null, tokensBought?: null): RemoveLiquidityOneEventFilter;
        RemoveLiquidityOne(provider?: string | null, lpTokenAmount?: null, lpTokenSupply?: null, boughtId?: null, tokensBought?: null): RemoveLiquidityOneEventFilter;
        "StopRampA(uint256,uint256)"(currentA?: null, time?: null): StopRampAEventFilter;
        StopRampA(currentA?: null, time?: null): StopRampAEventFilter;
        "TokenSwap(address,uint256,uint256,uint128,uint128)"(buyer?: string | null, tokensSold?: null, tokensBought?: null, soldId?: null, boughtId?: null): TokenSwapEventFilter;
        TokenSwap(buyer?: string | null, tokensSold?: null, tokensBought?: null, soldId?: null, boughtId?: null): TokenSwapEventFilter;
        "Unpaused(address)"(account?: null): UnpausedEventFilter;
        Unpaused(account?: null): UnpausedEventFilter;
    };
    estimateGas: {
        MAX_BPS(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Add liquidity to the pool with the given amounts of tokens
         * @param amounts the amounts of each token to add, in their native precision
         * @param deadline latest timestamp to accept this transaction
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         */
        addLiquidity(amounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * A simple method to calculate amount of each underlying tokens that is returned upon burning given amount of LP tokens
         * @param amount the amount of LP tokens that would be burned on withdrawal
         */
        calculateRemoveLiquidity(amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Calculate amount of tokens you receive on swap
         * @param dx the amount of tokens the user wants to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param tokenIndexFrom the token the user wants to sell
         * @param tokenIndexTo the token the user wants to buy
         */
        calculateSwap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Borrow the specified token from this pool for this transaction only. This function will call `IFlashLoanReceiver(receiver).executeOperation` and the `receiver` must return the full amount of the token and the associated fee by the end of the callback transaction. If the conditions are not met, this call is reverted.
         * @param amount the total amount to borrow in this transaction
         * @param params optional data to pass along to the callback function
         * @param receiver the address of the receiver of the token. This address must implement the IFlashLoanReceiver interface and the callback function `executeOperation`.
         * @param token the protocol fee in bps to be applied on the total flash loan fee
         */
        flashLoan(receiver: string, token: string, amount: BigNumberish, params: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        flashLoanFeeBPS(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * See the StableSwap paper for details
         * Return A, the amplification coefficient * n * (n - 1)
         */
        getA(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * See the StableSwap paper for details
         * Return A in its raw precision form
         */
        getAPrecise(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This function reads the accumulated amount of admin fees of the token with given index
         * @param index Index of the pooled token
         */
        getAdminBalance(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Return address of the pooled token at given index. Reverts if tokenIndex is out of range.
         * @param index the index of the token
         */
        getToken(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Return current balance of the pooled token at given index
         * @param index the index of the token
         */
        getTokenBalance(index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Return the index of the given token address. Reverts if no matching token is found.
         * @param tokenAddress address of the token
         */
        getTokenIndex(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Get the virtual price, to help calculate profit
         */
        getVirtualPrice(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Initializes this Swap contract with the given parameters. This will also clone a LPToken contract that represents users' LP positions. The owner of LPToken will be this contract - which means only this contract is allowed to mint/burn tokens.
         * @param _a the amplification coefficient * n * (n - 1). See the StableSwap paper for details
         * @param _adminFee default adminFee to be initialized with
         * @param _fee default swap fee to be initialized with
         * @param _pooledTokens an array of ERC20s this pool will accept
         * @param decimals the decimals to use for each pooled token, eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS
         * @param lpTokenName the long-form name of the token to be deployed
         * @param lpTokenSymbol the short symbol for the token to be deployed
         * @param lpTokenTargetAddress the address of an existing LPToken contract to use as a target
         */
        initialize(_pooledTokens: string[], decimals: BigNumberish[], lpTokenName: string, lpTokenSymbol: string, _a: BigNumberish, _fee: BigNumberish, _adminFee: BigNumberish, lpTokenTargetAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Returns the address of the current owner.
         */
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Pause the contract. Revert if already paused.
         */
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        protocolFeeShareBPS(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Start ramping up or down A parameter towards given futureA and futureTime Checks if the change is too rapid, and commits the new A value only when it falls under the limit range.
         * @param futureA the new A to ramp towards
         * @param futureTime timestamp when the new A should be reached
         */
        rampA(futureA: BigNumberish, futureTime: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Liquidity can always be removed, even when the pool is paused.
         * Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amount the amount of LP tokens to burn
         * @param deadline latest timestamp to accept this transaction
         * @param minAmounts the minimum amounts of each token in the pool acceptable for this burn. Useful as a front-running mitigation
         */
        removeLiquidity(amount: BigNumberish, minAmounts: BigNumberish[], deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Remove liquidity from the pool, weighted differently than the pool's current balances. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amounts how much of each token to withdraw
         * @param deadline latest timestamp to accept this transaction
         * @param maxBurnAmount the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation.
         */
        removeLiquidityImbalance(amounts: BigNumberish[], maxBurnAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Remove liquidity from the pool all in one token. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param deadline latest timestamp to accept this transaction
         * @param minAmount the minimum amount to withdraw, otherwise revert
         * @param tokenAmount the amount of the token you want to receive
         * @param tokenIndex the index of the token you want to receive
         */
        removeLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, minAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
         */
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Update the admin fee. Admin fee takes portion of the swap fee.
         * @param newAdminFee new admin fee to be applied on future transactions
         */
        setAdminFee(newAdminFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Updates the flash loan fee parameters. This function can only be called by the owner.
         * @param newFlashLoanFeeBPS the total fee in bps to be applied on future flash loans
         * @param newProtocolFeeShareBPS the protocol fee in bps to be applied on the total flash loan fee
         */
        setFlashLoanFees(newFlashLoanFeeBPS: BigNumberish, newProtocolFeeShareBPS: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Update the swap fee to be applied on swaps
         * @param newSwapFee new swap fee to be applied on future transactions
         */
        setSwapFee(newSwapFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Stop ramping A immediately. Reverts if ramp A is already stopped.
         */
        stopRampA(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Swap two tokens using this pool
         * @param deadline latest timestamp to accept this transaction
         * @param dx the amount of tokens the user wants to swap from
         * @param minDy the min amount the user would like to receive, or revert.
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        swap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        swapStorage(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
         */
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Unpause the contract. Revert if already unpaused.
         */
        unpause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Withdraw all admin fees to the contract owner
         */
        withdrawAdminFees(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        MAX_BPS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Add liquidity to the pool with the given amounts of tokens
         * @param amounts the amounts of each token to add, in their native precision
         * @param deadline latest timestamp to accept this transaction
         * @param minToMint the minimum LP tokens adding this amount of liquidity should mint, otherwise revert. Handy for front-running mitigation
         */
        addLiquidity(amounts: BigNumberish[], minToMint: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * A simple method to calculate amount of each underlying tokens that is returned upon burning given amount of LP tokens
         * @param amount the amount of LP tokens that would be burned on withdrawal
         */
        calculateRemoveLiquidity(amount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Calculate the amount of underlying token available to withdraw when withdrawing via only single token
         * @param tokenAmount the amount of LP token to burn
         * @param tokenIndex index of which token will be withdrawn
         */
        calculateRemoveLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Calculate amount of tokens you receive on swap
         * @param dx the amount of tokens the user wants to sell. If the token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param tokenIndexFrom the token the user wants to sell
         * @param tokenIndexTo the token the user wants to buy
         */
        calculateSwap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * This shouldn't be used outside frontends for user estimates.
         * A simple method to calculate prices from deposits or withdrawals, excluding fees but including slippage. This is helpful as an input into the various "min" parameters on calls to fight front-running
         * @param amounts an array of token amounts to deposit or withdrawal, corresponding to pooledTokens. The amount should be in each pooled token's native precision. If a token charges a fee on transfers, use the amount that gets transferred after the fee.
         * @param deposit whether this is a deposit or a withdrawal
         */
        calculateTokenAmount(amounts: BigNumberish[], deposit: boolean, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Borrow the specified token from this pool for this transaction only. This function will call `IFlashLoanReceiver(receiver).executeOperation` and the `receiver` must return the full amount of the token and the associated fee by the end of the callback transaction. If the conditions are not met, this call is reverted.
         * @param amount the total amount to borrow in this transaction
         * @param params optional data to pass along to the callback function
         * @param receiver the address of the receiver of the token. This address must implement the IFlashLoanReceiver interface and the callback function `executeOperation`.
         * @param token the protocol fee in bps to be applied on the total flash loan fee
         */
        flashLoan(receiver: string, token: string, amount: BigNumberish, params: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        flashLoanFeeBPS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * See the StableSwap paper for details
         * Return A, the amplification coefficient * n * (n - 1)
         */
        getA(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * See the StableSwap paper for details
         * Return A in its raw precision form
         */
        getAPrecise(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * This function reads the accumulated amount of admin fees of the token with given index
         * @param index Index of the pooled token
         */
        getAdminBalance(index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Return address of the pooled token at given index. Reverts if tokenIndex is out of range.
         * @param index the index of the token
         */
        getToken(index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Return current balance of the pooled token at given index
         * @param index the index of the token
         */
        getTokenBalance(index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Return the index of the given token address. Reverts if no matching token is found.
         * @param tokenAddress address of the token
         */
        getTokenIndex(tokenAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Get the virtual price, to help calculate profit
         */
        getVirtualPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Initializes this Swap contract with the given parameters. This will also clone a LPToken contract that represents users' LP positions. The owner of LPToken will be this contract - which means only this contract is allowed to mint/burn tokens.
         * @param _a the amplification coefficient * n * (n - 1). See the StableSwap paper for details
         * @param _adminFee default adminFee to be initialized with
         * @param _fee default swap fee to be initialized with
         * @param _pooledTokens an array of ERC20s this pool will accept
         * @param decimals the decimals to use for each pooled token, eg 8 for WBTC. Cannot be larger than POOL_PRECISION_DECIMALS
         * @param lpTokenName the long-form name of the token to be deployed
         * @param lpTokenSymbol the short symbol for the token to be deployed
         * @param lpTokenTargetAddress the address of an existing LPToken contract to use as a target
         */
        initialize(_pooledTokens: string[], decimals: BigNumberish[], lpTokenName: string, lpTokenSymbol: string, _a: BigNumberish, _fee: BigNumberish, _adminFee: BigNumberish, lpTokenTargetAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Returns the address of the current owner.
         */
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Pause the contract. Revert if already paused.
         */
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        protocolFeeShareBPS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Start ramping up or down A parameter towards given futureA and futureTime Checks if the change is too rapid, and commits the new A value only when it falls under the limit range.
         * @param futureA the new A to ramp towards
         * @param futureTime timestamp when the new A should be reached
         */
        rampA(futureA: BigNumberish, futureTime: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Liquidity can always be removed, even when the pool is paused.
         * Burn LP tokens to remove liquidity from the pool. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amount the amount of LP tokens to burn
         * @param deadline latest timestamp to accept this transaction
         * @param minAmounts the minimum amounts of each token in the pool acceptable for this burn. Useful as a front-running mitigation
         */
        removeLiquidity(amount: BigNumberish, minAmounts: BigNumberish[], deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Remove liquidity from the pool, weighted differently than the pool's current balances. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param amounts how much of each token to withdraw
         * @param deadline latest timestamp to accept this transaction
         * @param maxBurnAmount the max LP token provider is willing to pay to remove liquidity. Useful as a front-running mitigation.
         */
        removeLiquidityImbalance(amounts: BigNumberish[], maxBurnAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Remove liquidity from the pool all in one token. Withdraw fee that decays linearly over period of 4 weeks since last deposit will apply.
         * @param deadline latest timestamp to accept this transaction
         * @param minAmount the minimum amount to withdraw, otherwise revert
         * @param tokenAmount the amount of the token you want to receive
         * @param tokenIndex the index of the token you want to receive
         */
        removeLiquidityOneToken(tokenAmount: BigNumberish, tokenIndex: BigNumberish, minAmount: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
         */
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Update the admin fee. Admin fee takes portion of the swap fee.
         * @param newAdminFee new admin fee to be applied on future transactions
         */
        setAdminFee(newAdminFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Updates the flash loan fee parameters. This function can only be called by the owner.
         * @param newFlashLoanFeeBPS the total fee in bps to be applied on future flash loans
         * @param newProtocolFeeShareBPS the protocol fee in bps to be applied on the total flash loan fee
         */
        setFlashLoanFees(newFlashLoanFeeBPS: BigNumberish, newProtocolFeeShareBPS: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Update the swap fee to be applied on swaps
         * @param newSwapFee new swap fee to be applied on future transactions
         */
        setSwapFee(newSwapFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Stop ramping A immediately. Reverts if ramp A is already stopped.
         */
        stopRampA(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Swap two tokens using this pool
         * @param deadline latest timestamp to accept this transaction
         * @param dx the amount of tokens the user wants to swap from
         * @param minDy the min amount the user would like to receive, or revert.
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        swap(tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, dx: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        swapStorage(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
         */
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Unpause the contract. Revert if already unpaused.
         */
        unpause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Withdraw all admin fees to the contract owner
         */
        withdrawAdminFees(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}