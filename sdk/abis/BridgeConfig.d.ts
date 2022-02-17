declare const ABI: {
    abi: ({
        inputs: any[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    devdoc: {
        kind: string;
        methods: {
            "calculateSwapFee(address,uint256,uint256)": {
                details: string;
                params: {
                    amount: string;
                    chainID: string;
                    tokenAddress: string;
                };
                returns: {
                    _0: string;
                };
            };
            "getRoleAdmin(bytes32)": {
                details: string;
            };
            "getRoleMember(bytes32,uint256)": {
                details: string;
            };
            "getRoleMemberCount(bytes32)": {
                details: string;
            };
            "getToken(address,uint256)": {
                params: {
                    chainID: string;
                    tokenAddress: string;
                };
            };
            "getToken(string,uint256)": {
                params: {
                    chainID: string;
                    tokenID: string;
                };
            };
            "getTokenID(address,uint256)": {
                params: {
                    chainID: string;
                    tokenAddress: string;
                };
            };
            "getUnderlyingToken(string)": {
                params: {
                    tokenID: string;
                };
            };
            "grantRole(bytes32,address)": {
                details: string;
            };
            "hasRole(bytes32,address)": {
                details: string;
            };
            "hasUnderlyingToken(string)": {
                params: {
                    tokenID: string;
                };
            };
            "renounceRole(bytes32,address)": {
                details: string;
            };
            "revokeRole(bytes32,address)": {
                details: string;
            };
            "setTokenConfig(string,uint256,address,uint8,uint256,uint256,uint256,uint256,uint256,bool,bool)": {
                params: {
                    chainID: string;
                    hasUnderlying: string;
                    isUnderlying: string;
                    maxSwap: string;
                    maxSwapFee: string;
                    minSwap: string;
                    minSwapFee: string;
                    swapFee: string;
                    tokenAddress: string;
                    tokenDecimals: string;
                    tokenID: string;
                };
            };
        };
        title: string;
        version: number;
    };
    userdoc: {
        kind: string;
        methods: {
            "calculateSwapFee(address,uint256,uint256)": {
                notice: string;
            };
            "getAllTokenIDs()": {
                notice: string;
            };
            "getToken(address,uint256)": {
                notice: string;
            };
            "getToken(string,uint256)": {
                notice: string;
            };
            "getTokenID(address,uint256)": {
                notice: string;
            };
            "getUnderlyingToken(string)": {
                notice: string;
            };
            "hasUnderlyingToken(string)": {
                notice: string;
            };
            "isTokenIDExist(string)": {
                notice: string;
            };
            "setTokenConfig(string,uint256,address,uint8,uint256,uint256,uint256,uint256,uint256,bool,bool)": {
                notice: string;
            };
        };
        notice: string;
        version: number;
    };
};
export default ABI;
