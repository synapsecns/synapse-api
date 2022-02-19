import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace BridgeConfig {
    type TokenStruct = {
        chainId: BigNumberish;
        tokenAddress: string;
        tokenDecimals: BigNumberish;
        maxSwap: BigNumberish;
        minSwap: BigNumberish;
        swapFee: BigNumberish;
        maxSwapFee: BigNumberish;
        minSwapFee: BigNumberish;
        hasUnderlying: boolean;
        isUnderlying: boolean;
    };
    type TokenStructOutput = [
        BigNumber,
        string,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        boolean
    ] & {
        chainId: BigNumber;
        tokenAddress: string;
        tokenDecimals: number;
        maxSwap: BigNumber;
        minSwap: BigNumber;
        swapFee: BigNumber;
        maxSwapFee: BigNumber;
        minSwapFee: BigNumber;
        hasUnderlying: boolean;
        isUnderlying: boolean;
    };
}
export interface BridgeConfigInterface extends utils.Interface {
    contractName: "BridgeConfig";
    functions: {
        "BRIDGEMANAGER_ROLE()": FunctionFragment;
        "DEFAULT_ADMIN_ROLE()": FunctionFragment;
        "calculateSwapFee(address,uint256,uint256)": FunctionFragment;
        "getAllTokenIDs()": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "getRoleMember(bytes32,uint256)": FunctionFragment;
        "getRoleMemberCount(bytes32)": FunctionFragment;
        "getToken(string,uint256)": FunctionFragment;
        "getTokenID(address,uint256)": FunctionFragment;
        "getUnderlyingToken(string)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "hasUnderlyingToken(string)": FunctionFragment;
        "isTokenIDExist(string)": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "setTokenConfig(string,uint256,address,uint8,uint256,uint256,uint256,uint256,uint256,bool,bool)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "BRIDGEMANAGER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "calculateSwapFee", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getAllTokenIDs", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getRoleMember", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRoleMemberCount", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getToken", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getTokenID", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getUnderlyingToken", values: [string]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "hasUnderlyingToken", values: [string]): string;
    encodeFunctionData(functionFragment: "isTokenIDExist", values: [string]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "setTokenConfig", values: [
        string,
        BigNumberish,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        boolean,
        boolean
    ]): string;
    decodeFunctionResult(functionFragment: "BRIDGEMANAGER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calculateSwapFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAllTokenIDs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMember", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleMemberCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUnderlyingToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasUnderlyingToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isTokenIDExist", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTokenConfig", data: BytesLike): Result;
    events: {
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}
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
export interface BridgeConfig extends BaseContract {
    contractName: "BridgeConfig";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BridgeConfigInterface;
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
        BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<[string]>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        /**
         * This means the fee should be calculated based on the chain that the nodes emit a tx on
         * Calculates bridge swap fee based on the destination chain's token transfer.
         * @param amount in native token decimals
         * @param chainID destination chain ID to query the token config for
         * @param tokenAddress address of the destination token to query token config for
         */
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        /**
         * Returns a list of all existing token IDs converted to strings
         */
        getAllTokenIDs(overrides?: CallOverrides): Promise<[string[]] & {
            result: string[];
        }>;
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
         * Returns the full token config struct
         * @param chainID Chain ID of which token address + config to get
         * @param tokenID String input of the token ID for the token
         */
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<[
            BridgeConfig.TokenStructOutput
        ] & {
            token: BridgeConfig.TokenStructOutput;
        }>;
        /**
         * Returns token config struct, given an address and chainID
         * @param chainID Chain ID of which token to get config for
         * @param tokenAddress Matches the token ID by using a combo of address + chain ID
         */
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<[
            BridgeConfig.TokenStructOutput
        ] & {
            token: BridgeConfig.TokenStructOutput;
        }>;
        /**
         * Returns the token ID (string) of the cross-chain token inputted
         * @param chainID chainID of which to get token ID for
         * @param tokenAddress address of token to get ID for
         */
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        /**
         * Returns which token is the underlying token to withdraw
         * @param tokenID string token ID
         */
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<[
            BridgeConfig.TokenStructOutput
        ] & {
            token: BridgeConfig.TokenStructOutput;
        }>;
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
        /**
         * Returns true if the token has an underlying token -- meaning the token is deposited into the bridge
         * @param tokenID String to check if it is a withdraw/underlying token
         */
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<[boolean]>;
        /**
         * Public function returning if token ID exists given a string
         */
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<[boolean]>;
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
        /**
         * Main write function of this contract - Handles creating the struct and passing it to the internal logic function
         * @param chainID chain ID to use for the token config object
         * @param hasUnderlying bool which represents whether this is a global mint token or one to withdraw()
         * @param isUnderlying bool which represents if this token is the one to withdraw on the given chain
         * @param maxSwap maximum amount of token allowed to be transferred at once - in native token decimals
         * @param maxSwapFee max swap fee to be charged - in native token decimals
         * @param minSwap minimum amount of token needed to be transferred at once - in native token decimals
         * @param minSwapFee min swap fee to be charged - in native token decimals - especially useful for mainnet ETH
         * @param swapFee percent based swap fee -- 10e6 == 10bps
         * @param tokenAddress token address of the token on the given chain
         * @param tokenDecimals decimals of token
         * @param tokenID string ID to set the token config object form
         */
        setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<string>;
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    /**
     * This means the fee should be calculated based on the chain that the nodes emit a tx on
     * Calculates bridge swap fee based on the destination chain's token transfer.
     * @param amount in native token decimals
     * @param chainID destination chain ID to query the token config for
     * @param tokenAddress address of the destination token to query token config for
     */
    calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    /**
     * Returns a list of all existing token IDs converted to strings
     */
    getAllTokenIDs(overrides?: CallOverrides): Promise<string[]>;
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
     * Returns the full token config struct
     * @param chainID Chain ID of which token address + config to get
     * @param tokenID String input of the token ID for the token
     */
    "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BridgeConfig.TokenStructOutput>;
    /**
     * Returns token config struct, given an address and chainID
     * @param chainID Chain ID of which token to get config for
     * @param tokenAddress Matches the token ID by using a combo of address + chain ID
     */
    "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BridgeConfig.TokenStructOutput>;
    /**
     * Returns the token ID (string) of the cross-chain token inputted
     * @param chainID chainID of which to get token ID for
     * @param tokenAddress address of token to get ID for
     */
    getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<string>;
    /**
     * Returns which token is the underlying token to withdraw
     * @param tokenID string token ID
     */
    getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<BridgeConfig.TokenStructOutput>;
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
    /**
     * Returns true if the token has an underlying token -- meaning the token is deposited into the bridge
     * @param tokenID String to check if it is a withdraw/underlying token
     */
    hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
    /**
     * Public function returning if token ID exists given a string
     */
    isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
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
    /**
     * Main write function of this contract - Handles creating the struct and passing it to the internal logic function
     * @param chainID chain ID to use for the token config object
     * @param hasUnderlying bool which represents whether this is a global mint token or one to withdraw()
     * @param isUnderlying bool which represents if this token is the one to withdraw on the given chain
     * @param maxSwap maximum amount of token allowed to be transferred at once - in native token decimals
     * @param maxSwapFee max swap fee to be charged - in native token decimals
     * @param minSwap minimum amount of token needed to be transferred at once - in native token decimals
     * @param minSwapFee min swap fee to be charged - in native token decimals - especially useful for mainnet ETH
     * @param swapFee percent based swap fee -- 10e6 == 10bps
     * @param tokenAddress token address of the token on the given chain
     * @param tokenDecimals decimals of token
     * @param tokenID string ID to set the token config object form
     */
    setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<string>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        /**
         * This means the fee should be calculated based on the chain that the nodes emit a tx on
         * Calculates bridge swap fee based on the destination chain's token transfer.
         * @param amount in native token decimals
         * @param chainID destination chain ID to query the token config for
         * @param tokenAddress address of the destination token to query token config for
         */
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns a list of all existing token IDs converted to strings
         */
        getAllTokenIDs(overrides?: CallOverrides): Promise<string[]>;
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
         * Returns the full token config struct
         * @param chainID Chain ID of which token address + config to get
         * @param tokenID String input of the token ID for the token
         */
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BridgeConfig.TokenStructOutput>;
        /**
         * Returns token config struct, given an address and chainID
         * @param chainID Chain ID of which token to get config for
         * @param tokenAddress Matches the token ID by using a combo of address + chain ID
         */
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BridgeConfig.TokenStructOutput>;
        /**
         * Returns the token ID (string) of the cross-chain token inputted
         * @param chainID chainID of which to get token ID for
         * @param tokenAddress address of token to get ID for
         */
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<string>;
        /**
         * Returns which token is the underlying token to withdraw
         * @param tokenID string token ID
         */
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<BridgeConfig.TokenStructOutput>;
        /**
         * Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.
         */
        grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        /**
         * Returns `true` if `account` has been granted `role`.
         */
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
        /**
         * Returns true if the token has an underlying token -- meaning the token is deposited into the bridge
         * @param tokenID String to check if it is a withdraw/underlying token
         */
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
        /**
         * Public function returning if token ID exists given a string
         */
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
        /**
         * Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.
         */
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        /**
         * Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.
         */
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        /**
         * Main write function of this contract - Handles creating the struct and passing it to the internal logic function
         * @param chainID chain ID to use for the token config object
         * @param hasUnderlying bool which represents whether this is a global mint token or one to withdraw()
         * @param isUnderlying bool which represents if this token is the one to withdraw on the given chain
         * @param maxSwap maximum amount of token allowed to be transferred at once - in native token decimals
         * @param maxSwapFee max swap fee to be charged - in native token decimals
         * @param minSwap minimum amount of token needed to be transferred at once - in native token decimals
         * @param minSwapFee min swap fee to be charged - in native token decimals - especially useful for mainnet ETH
         * @param swapFee percent based swap fee -- 10e6 == 10bps
         * @param tokenAddress token address of the token on the given chain
         * @param tokenDecimals decimals of token
         * @param tokenID string ID to set the token config object form
         */
        setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: BytesLike | null, previousAdminRole?: BytesLike | null, newAdminRole?: BytesLike | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        RoleGranted(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
        RoleRevoked(role?: BytesLike | null, account?: string | null, sender?: string | null): RoleRevokedEventFilter;
    };
    estimateGas: {
        BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * This means the fee should be calculated based on the chain that the nodes emit a tx on
         * Calculates bridge swap fee based on the destination chain's token transfer.
         * @param amount in native token decimals
         * @param chainID destination chain ID to query the token config for
         * @param tokenAddress address of the destination token to query token config for
         */
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns a list of all existing token IDs converted to strings
         */
        getAllTokenIDs(overrides?: CallOverrides): Promise<BigNumber>;
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
         * Returns the full token config struct
         * @param chainID Chain ID of which token address + config to get
         * @param tokenID String input of the token ID for the token
         */
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns token config struct, given an address and chainID
         * @param chainID Chain ID of which token to get config for
         * @param tokenAddress Matches the token ID by using a combo of address + chain ID
         */
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns the token ID (string) of the cross-chain token inputted
         * @param chainID chainID of which to get token ID for
         * @param tokenAddress address of token to get ID for
         */
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Returns which token is the underlying token to withdraw
         * @param tokenID string token ID
         */
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<BigNumber>;
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
        /**
         * Returns true if the token has an underlying token -- meaning the token is deposited into the bridge
         * @param tokenID String to check if it is a withdraw/underlying token
         */
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<BigNumber>;
        /**
         * Public function returning if token ID exists given a string
         */
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<BigNumber>;
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
        /**
         * Main write function of this contract - Handles creating the struct and passing it to the internal logic function
         * @param chainID chain ID to use for the token config object
         * @param hasUnderlying bool which represents whether this is a global mint token or one to withdraw()
         * @param isUnderlying bool which represents if this token is the one to withdraw on the given chain
         * @param maxSwap maximum amount of token allowed to be transferred at once - in native token decimals
         * @param maxSwapFee max swap fee to be charged - in native token decimals
         * @param minSwap minimum amount of token needed to be transferred at once - in native token decimals
         * @param minSwapFee min swap fee to be charged - in native token decimals - especially useful for mainnet ETH
         * @param swapFee percent based swap fee -- 10e6 == 10bps
         * @param tokenAddress token address of the token on the given chain
         * @param tokenDecimals decimals of token
         * @param tokenID string ID to set the token config object form
         */
        setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * This means the fee should be calculated based on the chain that the nodes emit a tx on
         * Calculates bridge swap fee based on the destination chain's token transfer.
         * @param amount in native token decimals
         * @param chainID destination chain ID to query the token config for
         * @param tokenAddress address of the destination token to query token config for
         */
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Returns a list of all existing token IDs converted to strings
         */
        getAllTokenIDs(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
         * Returns the full token config struct
         * @param chainID Chain ID of which token address + config to get
         * @param tokenID String input of the token ID for the token
         */
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Returns token config struct, given an address and chainID
         * @param chainID Chain ID of which token to get config for
         * @param tokenAddress Matches the token ID by using a combo of address + chain ID
         */
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Returns the token ID (string) of the cross-chain token inputted
         * @param chainID chainID of which to get token ID for
         * @param tokenAddress address of token to get ID for
         */
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Returns which token is the underlying token to withdraw
         * @param tokenID string token ID
         */
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
        /**
         * Returns true if the token has an underlying token -- meaning the token is deposited into the bridge
         * @param tokenID String to check if it is a withdraw/underlying token
         */
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        /**
         * Public function returning if token ID exists given a string
         */
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
        /**
         * Main write function of this contract - Handles creating the struct and passing it to the internal logic function
         * @param chainID chain ID to use for the token config object
         * @param hasUnderlying bool which represents whether this is a global mint token or one to withdraw()
         * @param isUnderlying bool which represents if this token is the one to withdraw on the given chain
         * @param maxSwap maximum amount of token allowed to be transferred at once - in native token decimals
         * @param maxSwapFee max swap fee to be charged - in native token decimals
         * @param minSwap minimum amount of token needed to be transferred at once - in native token decimals
         * @param minSwapFee min swap fee to be charged - in native token decimals - especially useful for mainnet ETH
         * @param swapFee percent based swap fee -- 10e6 == 10bps
         * @param tokenAddress token address of the token on the given chain
         * @param tokenDecimals decimals of token
         * @param tokenID string ID to set the token config object form
         */
        setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
