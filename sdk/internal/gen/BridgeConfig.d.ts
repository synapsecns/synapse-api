import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type TokenStruct = {
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
export declare type TokenStructOutput = [
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
export interface BridgeConfigInterface extends ethers.utils.Interface {
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
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        getAllTokenIDs(overrides?: CallOverrides): Promise<[string[]] & {
            result: string[];
        }>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<[TokenStructOutput] & {
            token: TokenStructOutput;
        }>;
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<[TokenStructOutput] & {
            token: TokenStructOutput;
        }>;
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<[TokenStructOutput] & {
            token: TokenStructOutput;
        }>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<[boolean]>;
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<[boolean]>;
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<[boolean]>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<string>;
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getAllTokenIDs(overrides?: CallOverrides): Promise<string[]>;
    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
    getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<TokenStructOutput>;
    "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<TokenStructOutput>;
    getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<TokenStructOutput>;
    grantRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
    hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
    isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
    renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<string>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getAllTokenIDs(overrides?: CallOverrides): Promise<string[]>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<TokenStructOutput>;
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<TokenStructOutput>;
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<TokenStructOutput>;
        grantRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<boolean>;
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<boolean>;
        renounceRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<void>;
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
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getAllTokenIDs(overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<BigNumber>;
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<BigNumber>;
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<BigNumber>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        BRIDGEMANAGER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        calculateSwapFee(tokenAddress: string, chainID: BigNumberish, amount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAllTokenIDs(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleMember(role: BytesLike, index: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleMemberCount(role: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getToken(string,uint256)"(tokenID: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        "getToken(address,uint256)"(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTokenID(tokenAddress: string, chainID: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        hasRole(role: BytesLike, account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasUnderlyingToken(tokenID: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isTokenIDExist(tokenID: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: BytesLike, account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setTokenConfig(tokenID: string, chainID: BigNumberish, tokenAddress: string, tokenDecimals: BigNumberish, maxSwap: BigNumberish, minSwap: BigNumberish, swapFee: BigNumberish, maxSwapFee: BigNumberish, minSwapFee: BigNumberish, hasUnderlying: boolean, isUnderlying: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
