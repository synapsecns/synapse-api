import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface SynapseBridgeInterface extends utils.Interface {
    contractName: "SynapseBridge";
    functions: {
        "DEFAULT_ADMIN_ROLE()": FunctionFragment;
        "GOVERNANCE_ROLE()": FunctionFragment;
        "NODEGROUP_ROLE()": FunctionFragment;
        "WETH_ADDRESS()": FunctionFragment;
        "addKappas(bytes32[])": FunctionFragment;
        "bridgeVersion()": FunctionFragment;
        "chainGasAmount()": FunctionFragment;
        "deposit(address,uint256,address,uint256)": FunctionFragment;
        "depositAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": FunctionFragment;
        "getFeeBalance(address)": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "getRoleMember(bytes32,uint256)": FunctionFragment;
        "getRoleMemberCount(bytes32)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "initialize()": FunctionFragment;
        "kappaExists(bytes32)": FunctionFragment;
        "mint(address,address,uint256,uint256,bytes32)": FunctionFragment;
        "mintAndSwap(address,address,uint256,uint256,address,uint8,uint8,uint256,uint256,bytes32)": FunctionFragment;
        "pause()": FunctionFragment;
        "paused()": FunctionFragment;
        "redeem(address,uint256,address,uint256)": FunctionFragment;
        "redeemAndRemove(address,uint256,address,uint256,uint8,uint256,uint256)": FunctionFragment;
        "redeemAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "setChainGasAmount(uint256)": FunctionFragment;
        "setWethAddress(address)": FunctionFragment;
        "startBlockNumber()": FunctionFragment;
        "unpause()": FunctionFragment;
        "withdraw(address,address,uint256,uint256,bytes32)": FunctionFragment;
        "withdrawAndRemove(address,address,uint256,uint256,address,uint8,uint256,uint256,bytes32)": FunctionFragment;
        "withdrawFees(address,address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "GOVERNANCE_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "NODEGROUP_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "WETH_ADDRESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "addKappas", values: [BytesLike[]]): string;
    encodeFunctionData(functionFragment: "bridgeVersion", values?: undefined): string;
    encodeFunctionData(functionFragment: "chainGasAmount", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "getFeeBalance", values: [string]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleMember", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleMemberCount", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "initialize", values?: undefined): string;
    encodeFunctionData(functionFragment: "kappaExists", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "mint", values: [string, string, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "mintAndSwap", values: [
        string,
        string,
        BigNumberish,
        BigNumberish,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "redeem", values: [string, BigNumberish, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "redeemAndRemove", values: [
        string,
        BigNumberish,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "redeemAndSwap", values: [
        string,
        BigNumberish,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "setChainGasAmount", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setWethAddress", values: [string]): string;
    encodeFunctionData(functionFragment: "startBlockNumber", values?: undefined): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdraw", values: [string, string, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "withdrawAndRemove", values: [
        string,
        string,
        BigNumberish,
        BigNumberish,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "withdrawFees", values: [string, string]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "GOVERNANCE_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "NODEGROUP_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WETH_ADDRESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addKappas", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bridgeVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "chainGasAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositAndSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFeeBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMember", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMemberCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "kappaExists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintAndSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemAndRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemAndSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setChainGasAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWethAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startBlockNumber", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawAndRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFees", data: BytesLike): Result;
    events: {
        "Paused(address)": EventFragment;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
        "TokenDeposit(address,uint256,address,uint256)": EventFragment;
        "TokenDepositAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": EventFragment;
        "TokenMint(address,address,uint256,uint256,bytes32)": EventFragment;
        "TokenMintAndSwap(address,address,uint256,uint256,uint8,uint8,uint256,uint256,bool,bytes32)": EventFragment;
        "TokenRedeem(address,uint256,address,uint256)": EventFragment;
        "TokenRedeemAndRemove(address,uint256,address,uint256,uint8,uint256,uint256)": EventFragment;
        "TokenRedeemAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": EventFragment;
        "TokenWithdraw(address,address,uint256,uint256,bytes32)": EventFragment;
        "TokenWithdrawAndRemove(address,address,uint256,uint256,uint8,uint256,uint256,bool,bytes32)": EventFragment;
        "Unpaused(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenDeposit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenDepositAndSwap"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenMint"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenMintAndSwap"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenRedeem"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenRedeemAndRemove"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenRedeemAndSwap"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenWithdraw"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TokenWithdrawAndRemove"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}
export declare type PausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type PausedEventFilter = TypedEventFilter<PausedEvent>;
export declare type RoleAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
}>;
export declare type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>;
export declare type RoleGrantedEvent = TypedEvent<[
    string,
    string,
    string
], {
    role: string;
    account: string;
    sender: string;
}>;
export declare type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
export declare type RoleRevokedEvent = TypedEvent<[
    string,
    string,
    string
], {
    role: string;
    account: string;
    sender: string;
}>;
export declare type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
export declare type TokenDepositEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber
], {
    to: string;
    chainId: BigNumber;
    token: string;
    amount: BigNumber;
}>;
export declare type TokenDepositEventFilter = TypedEventFilter<TokenDepositEvent>;
export declare type TokenDepositAndSwapEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber,
    number,
    number,
    BigNumber,
    BigNumber
], {
    to: string;
    chainId: BigNumber;
    token: string;
    amount: BigNumber;
    tokenIndexFrom: number;
    tokenIndexTo: number;
    minDy: BigNumber;
    deadline: BigNumber;
}>;
export declare type TokenDepositAndSwapEventFilter = TypedEventFilter<TokenDepositAndSwapEvent>;
export declare type TokenMintEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    string
], {
    to: string;
    token: string;
    amount: BigNumber;
    fee: BigNumber;
    kappa: string;
}>;
export declare type TokenMintEventFilter = TypedEventFilter<TokenMintEvent>;
export declare type TokenMintAndSwapEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    number,
    number,
    BigNumber,
    BigNumber,
    boolean,
    string
], {
    to: string;
    token: string;
    amount: BigNumber;
    fee: BigNumber;
    tokenIndexFrom: number;
    tokenIndexTo: number;
    minDy: BigNumber;
    deadline: BigNumber;
    swapSuccess: boolean;
    kappa: string;
}>;
export declare type TokenMintAndSwapEventFilter = TypedEventFilter<TokenMintAndSwapEvent>;
export declare type TokenRedeemEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber
], {
    to: string;
    chainId: BigNumber;
    token: string;
    amount: BigNumber;
}>;
export declare type TokenRedeemEventFilter = TypedEventFilter<TokenRedeemEvent>;
export declare type TokenRedeemAndRemoveEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber,
    number,
    BigNumber,
    BigNumber
], {
    to: string;
    chainId: BigNumber;
    token: string;
    amount: BigNumber;
    swapTokenIndex: number;
    swapMinAmount: BigNumber;
    swapDeadline: BigNumber;
}>;
export declare type TokenRedeemAndRemoveEventFilter = TypedEventFilter<TokenRedeemAndRemoveEvent>;
export declare type TokenRedeemAndSwapEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber,
    number,
    number,
    BigNumber,
    BigNumber
], {
    to: string;
    chainId: BigNumber;
    token: string;
    amount: BigNumber;
    tokenIndexFrom: number;
    tokenIndexTo: number;
    minDy: BigNumber;
    deadline: BigNumber;
}>;
export declare type TokenRedeemAndSwapEventFilter = TypedEventFilter<TokenRedeemAndSwapEvent>;
export declare type TokenWithdrawEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    string
], {
    to: string;
    token: string;
    amount: BigNumber;
    fee: BigNumber;
    kappa: string;
}>;
export declare type TokenWithdrawEventFilter = TypedEventFilter<TokenWithdrawEvent>;
export declare type TokenWithdrawAndRemoveEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    number,
    BigNumber,
    BigNumber,
    boolean,
    string
], {
    to: string;
    token: string;
    amount: BigNumber;
    fee: BigNumber;
    swapTokenIndex: number;
    swapMinAmount: BigNumber;
    swapDeadline: BigNumber;
    swapSuccess: boolean;
    kappa: string;
}>;
export declare type TokenWithdrawAndRemoveEventFilter = TypedEventFilter<TokenWithdrawAndRemoveEvent>;
export declare type UnpausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
export interface SynapseBridge extends BaseContract {
    contractName: "SynapseBridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SynapseBridgeInterface;
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
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        GOVERNANCE_ROLE(overrides?: CallOverrides): Promise<[string]>;
        NODEGROUP_ROLE(overrides?: CallOverrides): Promise<[string]>;
        WETH_ADDRESS(overrides?: CallOverrides): Promise<[string]>;
        addKappas(kappas: BytesLike[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        bridgeVersion(overrides?: CallOverrides): Promise<[BigNumber]>;
        chainGasAmount(overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Relays to nodes to transfers an ERC20 token cross-chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Relays to nodes to both transfer an ERC20 token cross-chain, and then have the nodes execute a swap through a liquidity pool on behalf of the user.
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
        getFeeBalance(tokenAddress: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
         */
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        /**
         * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
         */
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        /**
         * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
         */
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
         */
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Returns `true` if `account` has been granted `role`.
         */
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        kappaExists(kappa: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        /**
         * This means the SynapseBridge.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to). This is called by the nodes after a TokenDeposit event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        mint(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * This means the BridgeDeposit.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to), and then attempt to swap the SynERC20 into the desired destination asset. This is called by the nodes after a TokenDepositAndSwap event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param deadline Epoch time of the deadline that the swap is allowed to be executed.
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param minDy Minumum amount (in final asset decimals) that must be swapped for, otherwise the user will receive the SynERC20.
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom Index of the SynERC20 asset in the pool
         * @param tokenIndexTo Index of the desired final asset
         */
        mintAndSwap(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which underlying chain to bridge assets onto
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token*
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeemAndRemove(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        redeemAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
         */
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
         */
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setChainGasAmount(amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setWethAddress(_wethAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        startBlockNumber(overrides?: CallOverrides): Promise<[BigNumber]>;
        unpause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdraw(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdrawAndRemove(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        /**
         * withdraw specified ERC20 token fees to a given address
         * @param to Address to send the fees to
         * @param token ERC20 token in which fees acccumulated to transfer
         */
        withdrawFees(token: string, to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    GOVERNANCE_ROLE(overrides?: CallOverrides): Promise<string>;
    NODEGROUP_ROLE(overrides?: CallOverrides): Promise<string>;
    WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;
    addKappas(kappas: BytesLike[], overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    bridgeVersion(overrides?: CallOverrides): Promise<BigNumber>;
    chainGasAmount(overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Relays to nodes to transfers an ERC20 token cross-chain
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
     * @param chainId which chain to bridge assets onto
     * @param to address on other chain to bridge assets to
     * @param token ERC20 compatible token to deposit into the bridge
     */
    deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Relays to nodes to both transfer an ERC20 token cross-chain, and then have the nodes execute a swap through a liquidity pool on behalf of the user.
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
    getFeeBalance(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
     */
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
    /**
     * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
     */
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
    /**
     * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
     */
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
     */
    grantRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Returns `true` if `account` has been granted `role`.
     */
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
    initialize(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    kappaExists(kappa: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    /**
     * This means the SynapseBridge.sol contract must have minter access to the token attempting to be minted
     * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to). This is called by the nodes after a TokenDeposit event is emitted.
     * @param amount Amount in native token decimals to transfer cross-chain post-fees
     * @param fee Amount in native token decimals to save to the contract as fees
     * @param kappa kappa*
     * @param to address on other chain to redeem underlying assets to
     * @param token ERC20 compatible token to deposit into the bridge
     */
    mint(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * This means the BridgeDeposit.sol contract must have minter access to the token attempting to be minted
     * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to), and then attempt to swap the SynERC20 into the desired destination asset. This is called by the nodes after a TokenDepositAndSwap event is emitted.
     * @param amount Amount in native token decimals to transfer cross-chain post-fees
     * @param deadline Epoch time of the deadline that the swap is allowed to be executed.
     * @param fee Amount in native token decimals to save to the contract as fees
     * @param kappa kappa*
     * @param minDy Minumum amount (in final asset decimals) that must be swapped for, otherwise the user will receive the SynERC20.
     * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
     * @param to address on other chain to redeem underlying assets to
     * @param token ERC20 compatible token to deposit into the bridge
     * @param tokenIndexFrom Index of the SynERC20 asset in the pool
     * @param tokenIndexTo Index of the desired final asset
     */
    mintAndSwap(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    pause(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Returns true if the contract is paused, and false otherwise.
     */
    paused(overrides?: CallOverrides): Promise<boolean>;
    /**
     * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
     * @param chainId which underlying chain to bridge assets onto
     * @param to address on other chain to redeem underlying assets to
     * @param token ERC20 compatible token to deposit into the bridge
     */
    redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees
     * @param chainId which underlying chain to bridge assets onto
     * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token*
     * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
     * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
     * @param to address on other chain to redeem underlying assets to
     * @param token ERC20 compatible token to deposit into the bridge
     */
    redeemAndRemove(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
     * @param amount Amount in native token decimals to transfer cross-chain pre-fees
     * @param chainId which underlying chain to bridge assets onto
     * @param deadline latest timestamp to accept this transaction*
     * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
     * @param to address on other chain to redeem underlying assets to
     * @param token ERC20 compatible token to deposit into the bridge
     * @param tokenIndexFrom the token the user wants to swap from
     * @param tokenIndexTo the token the user wants to swap to
     */
    redeemAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
     */
    renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
     */
    revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setChainGasAmount(amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setWethAddress(_wethAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    startBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
    unpause(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Function to be called by the node group to withdraw the underlying assets from the contract
     * @param amount Amount in native token decimals to withdraw
     * @param fee Amount in native token decimals to save to the contract as fees
     * @param kappa kappa*
     * @param to address on chain to send underlying assets to
     * @param token ERC20 compatible token to withdraw from the bridge
     */
    withdraw(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * Function to be called by the node group to withdraw the underlying assets from the contract
     * @param amount Amount in native token decimals to withdraw
     * @param fee Amount in native token decimals to save to the contract as fees
     * @param kappa kappa*
     * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
     * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token
     * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
     * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
     * @param to address on chain to send underlying assets to
     * @param token ERC20 compatible token to withdraw from the bridge
     */
    withdrawAndRemove(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    /**
     * withdraw specified ERC20 token fees to a given address
     * @param to Address to send the fees to
     * @param token ERC20 token in which fees acccumulated to transfer
     */
    withdrawFees(token: string, to: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        GOVERNANCE_ROLE(overrides?: CallOverrides): Promise<string>;
        NODEGROUP_ROLE(overrides?: CallOverrides): Promise<string>;
        WETH_ADDRESS(overrides?: CallOverrides): Promise<string>;
        addKappas(kappas: BytesLike[], overrides?: CallOverrides): Promise<void>;
        bridgeVersion(overrides?: CallOverrides): Promise<BigNumber>;
        chainGasAmount(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Relays to nodes to transfers an ERC20 token cross-chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Relays to nodes to both transfer an ERC20 token cross-chain, and then have the nodes execute a swap through a liquidity pool on behalf of the user.
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
        getFeeBalance(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
         */
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
        /**
         * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
         */
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
        /**
         * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
         */
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
         */
        grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        /**
         * Returns `true` if `account` has been granted `role`.
         */
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
        initialize(overrides?: CallOverrides): Promise<void>;
        kappaExists(kappa: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        /**
         * This means the SynapseBridge.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to). This is called by the nodes after a TokenDeposit event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        mint(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: CallOverrides): Promise<void>;
        /**
         * This means the BridgeDeposit.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to), and then attempt to swap the SynERC20 into the desired destination asset. This is called by the nodes after a TokenDepositAndSwap event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param deadline Epoch time of the deadline that the swap is allowed to be executed.
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param minDy Minumum amount (in final asset decimals) that must be swapped for, otherwise the user will receive the SynERC20.
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom Index of the SynERC20 asset in the pool
         * @param tokenIndexTo Index of the desired final asset
         */
        mintAndSwap(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, kappa: BytesLike, overrides?: CallOverrides): Promise<void>;
        pause(overrides?: CallOverrides): Promise<void>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<boolean>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which underlying chain to bridge assets onto
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token*
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeemAndRemove(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        redeemAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
        /**
         * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
         */
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        /**
         * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
         */
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        setChainGasAmount(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setWethAddress(_wethAddress: string, overrides?: CallOverrides): Promise<void>;
        startBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
        unpause(overrides?: CallOverrides): Promise<void>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdraw(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: CallOverrides): Promise<void>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdrawAndRemove(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, kappa: BytesLike, overrides?: CallOverrides): Promise<void>;
        /**
         * withdraw specified ERC20 token fees to a given address
         * @param to Address to send the fees to
         * @param token ERC20 token in which fees acccumulated to transfer
         */
        withdrawFees(token: string, to: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Paused(address)"(account?: null): PausedEventFilter;
        Paused(account?: null): PausedEventFilter;
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        RoleGranted(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        RoleRevoked(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        "TokenDeposit(address,uint256,address,uint256)"(to?: string | null, chainId?: null, token?: null, amount?: null): TokenDepositEventFilter;
        TokenDeposit(to?: string | null, chainId?: null, token?: null, amount?: null): TokenDepositEventFilter;
        "TokenDepositAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)"(to?: string | null, chainId?: null, token?: null, amount?: null, tokenIndexFrom?: null, tokenIndexTo?: null, minDy?: null, deadline?: null): TokenDepositAndSwapEventFilter;
        TokenDepositAndSwap(to?: string | null, chainId?: null, token?: null, amount?: null, tokenIndexFrom?: null, tokenIndexTo?: null, minDy?: null, deadline?: null): TokenDepositAndSwapEventFilter;
        "TokenMint(address,address,uint256,uint256,bytes32)"(to?: string | null, token?: null, amount?: null, fee?: null, kappa?: BytesLike | null): TokenMintEventFilter;
        TokenMint(to?: string | null, token?: null, amount?: null, fee?: null, kappa?: BytesLike | null): TokenMintEventFilter;
        "TokenMintAndSwap(address,address,uint256,uint256,uint8,uint8,uint256,uint256,bool,bytes32)"(to?: string | null, token?: null, amount?: null, fee?: null, tokenIndexFrom?: null, tokenIndexTo?: null, minDy?: null, deadline?: null, swapSuccess?: null, kappa?: BytesLike | null): TokenMintAndSwapEventFilter;
        TokenMintAndSwap(to?: string | null, token?: null, amount?: null, fee?: null, tokenIndexFrom?: null, tokenIndexTo?: null, minDy?: null, deadline?: null, swapSuccess?: null, kappa?: BytesLike | null): TokenMintAndSwapEventFilter;
        "TokenRedeem(address,uint256,address,uint256)"(to?: string | null, chainId?: null, token?: null, amount?: null): TokenRedeemEventFilter;
        TokenRedeem(to?: string | null, chainId?: null, token?: null, amount?: null): TokenRedeemEventFilter;
        "TokenRedeemAndRemove(address,uint256,address,uint256,uint8,uint256,uint256)"(to?: string | null, chainId?: null, token?: null, amount?: null, swapTokenIndex?: null, swapMinAmount?: null, swapDeadline?: null): TokenRedeemAndRemoveEventFilter;
        TokenRedeemAndRemove(to?: string | null, chainId?: null, token?: null, amount?: null, swapTokenIndex?: null, swapMinAmount?: null, swapDeadline?: null): TokenRedeemAndRemoveEventFilter;
        "TokenRedeemAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)"(to?: string | null, chainId?: null, token?: null, amount?: null, tokenIndexFrom?: null, tokenIndexTo?: null, minDy?: null, deadline?: null): TokenRedeemAndSwapEventFilter;
        TokenRedeemAndSwap(to?: string | null, chainId?: null, token?: null, amount?: null, tokenIndexFrom?: null, tokenIndexTo?: null, minDy?: null, deadline?: null): TokenRedeemAndSwapEventFilter;
        "TokenWithdraw(address,address,uint256,uint256,bytes32)"(to?: string | null, token?: null, amount?: null, fee?: null, kappa?: BytesLike | null): TokenWithdrawEventFilter;
        TokenWithdraw(to?: string | null, token?: null, amount?: null, fee?: null, kappa?: BytesLike | null): TokenWithdrawEventFilter;
        "TokenWithdrawAndRemove(address,address,uint256,uint256,uint8,uint256,uint256,bool,bytes32)"(to?: string | null, token?: null, amount?: null, fee?: null, swapTokenIndex?: null, swapMinAmount?: null, swapDeadline?: null, swapSuccess?: null, kappa?: BytesLike | null): TokenWithdrawAndRemoveEventFilter;
        TokenWithdrawAndRemove(to?: string | null, token?: null, amount?: null, fee?: null, swapTokenIndex?: null, swapMinAmount?: null, swapDeadline?: null, swapSuccess?: null, kappa?: BytesLike | null): TokenWithdrawAndRemoveEventFilter;
        "Unpaused(address)"(account?: null): UnpausedEventFilter;
        Unpaused(account?: null): UnpausedEventFilter;
    };
    estimateGas: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        GOVERNANCE_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        NODEGROUP_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        WETH_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;
        addKappas(kappas: BytesLike[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        bridgeVersion(overrides?: CallOverrides): Promise<BigNumber>;
        chainGasAmount(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Relays to nodes to transfers an ERC20 token cross-chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Relays to nodes to both transfer an ERC20 token cross-chain, and then have the nodes execute a swap through a liquidity pool on behalf of the user.
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
        getFeeBalance(tokenAddress: string, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
         */
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
         */
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
         */
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
         */
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Returns `true` if `account` has been granted `role`.
         */
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        kappaExists(kappa: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This means the SynapseBridge.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to). This is called by the nodes after a TokenDeposit event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        mint(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * This means the BridgeDeposit.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to), and then attempt to swap the SynERC20 into the desired destination asset. This is called by the nodes after a TokenDepositAndSwap event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param deadline Epoch time of the deadline that the swap is allowed to be executed.
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param minDy Minumum amount (in final asset decimals) that must be swapped for, otherwise the user will receive the SynERC20.
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom Index of the SynERC20 asset in the pool
         * @param tokenIndexTo Index of the desired final asset
         */
        mintAndSwap(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which underlying chain to bridge assets onto
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token*
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeemAndRemove(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        redeemAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
         */
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
         */
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setChainGasAmount(amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setWethAddress(_wethAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        startBlockNumber(overrides?: CallOverrides): Promise<BigNumber>;
        unpause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdraw(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdrawAndRemove(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        /**
         * withdraw specified ERC20 token fees to a given address
         * @param to Address to send the fees to
         * @param token ERC20 token in which fees acccumulated to transfer
         */
        withdrawFees(token: string, to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        GOVERNANCE_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        NODEGROUP_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        WETH_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addKappas(kappas: BytesLike[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        bridgeVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        chainGasAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Relays to nodes to transfers an ERC20 token cross-chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which chain to bridge assets onto
         * @param to address on other chain to bridge assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        deposit(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Relays to nodes to both transfer an ERC20 token cross-chain, and then have the nodes execute a swap through a liquidity pool on behalf of the user.
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
        getFeeBalance(tokenAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Returns the admin role that controls `role`. See {grantRole} and {revokeRole}. To change a role's admin, use {_setRoleAdmin}.
         */
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Returns one of the accounts that have `role`. `index` must be a value between 0 and {getRoleMemberCount}, non-inclusive. Role bearers are not sorted in any particular way, and their ordering may change at any point. WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure you perform all queries on the same block. See the following https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post] for more information.
         */
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Returns the number of accounts that have `role`. Can be used together with {getRoleMember} to enumerate all bearers of a role.
         */
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
         */
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Returns `true` if `account` has been granted `role`.
         */
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        kappaExists(kappa: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * This means the SynapseBridge.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to). This is called by the nodes after a TokenDeposit event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        mint(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * This means the BridgeDeposit.sol contract must have minter access to the token attempting to be minted
         * Nodes call this function to mint a SynERC20 (or any asset that the bridge is given minter access to), and then attempt to swap the SynERC20 into the desired destination asset. This is called by the nodes after a TokenDepositAndSwap event is emitted.
         * @param amount Amount in native token decimals to transfer cross-chain post-fees
         * @param deadline Epoch time of the deadline that the swap is allowed to be executed.
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param minDy Minumum amount (in final asset decimals) that must be swapped for, otherwise the user will receive the SynERC20.
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom Index of the SynERC20 asset in the pool
         * @param tokenIndexTo Index of the desired final asset
         */
        mintAndSwap(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        pause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Returns true if the contract is paused, and false otherwise.
         */
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees*
         * @param chainId which underlying chain to bridge assets onto
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeem(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token*
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         */
        redeemAndRemove(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Relays to nodes that (typically) a wrapped synAsset ERC20 token has been burned and the underlying needs to be redeeemed on the native chain. This function indicates to the nodes that they should attempt to redeem the LP token for the underlying assets (E.g "swap" out of the LP token)
         * @param amount Amount in native token decimals to transfer cross-chain pre-fees
         * @param chainId which underlying chain to bridge assets onto
         * @param deadline latest timestamp to accept this transaction*
         * @param minDy the min amount the user would like to receive, or revert to only minting the SynERC20 token crosschain.
         * @param to address on other chain to redeem underlying assets to
         * @param token ERC20 compatible token to deposit into the bridge
         * @param tokenIndexFrom the token the user wants to swap from
         * @param tokenIndexTo the token the user wants to swap to
         */
        redeemAndSwap(to: string, chainId: BigNumberish, token: string, amount: BigNumberish, tokenIndexFrom: BigNumberish, tokenIndexTo: BigNumberish, minDy: BigNumberish, deadline: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
         */
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
         */
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setChainGasAmount(amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setWethAddress(_wethAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        startBlockNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        unpause(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdraw(to: string, token: string, amount: BigNumberish, fee: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * Function to be called by the node group to withdraw the underlying assets from the contract
         * @param amount Amount in native token decimals to withdraw
         * @param fee Amount in native token decimals to save to the contract as fees
         * @param kappa kappa*
         * @param pool Destination chain's pool to use to swap SynERC20 -> Asset. The nodes determine this by using PoolConfig.sol.
         * @param swapDeadline Specificies the deadline that the nodes are allowed to try to redeem/swap the LP token
         * @param swapMinAmount Specifies the minimum amount of the underlying asset needed for the nodes to execute the redeem/swap
         * @param swapTokenIndex Specifies which of the underlying LP assets the nodes should attempt to redeem for
         * @param to address on chain to send underlying assets to
         * @param token ERC20 compatible token to withdraw from the bridge
         */
        withdrawAndRemove(to: string, token: string, amount: BigNumberish, fee: BigNumberish, pool: string, swapTokenIndex: BigNumberish, swapMinAmount: BigNumberish, swapDeadline: BigNumberish, kappa: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        /**
         * withdraw specified ERC20 token fees to a given address
         * @param to Address to send the fees to
         * @param token ERC20 token in which fees acccumulated to transfer
         */
        withdrawFees(token: string, to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
