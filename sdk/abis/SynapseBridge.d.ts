declare const ABI: {
    abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
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
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    devdoc: {
        kind: string;
        methods: {
            "deposit(address,uint256,address,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    to: string;
                    token: string;
                };
            };
            "depositAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    deadline: string;
                    minDy: string;
                    to: string;
                    token: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
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
            "grantRole(bytes32,address)": {
                details: string;
            };
            "hasRole(bytes32,address)": {
                details: string;
            };
            "mint(address,address,uint256,uint256,bytes32)": {
                details: string;
                params: {
                    amount: string;
                    fee: string;
                    kappa: string;
                    to: string;
                    token: string;
                };
            };
            "mintAndSwap(address,address,uint256,uint256,address,uint8,uint8,uint256,uint256,bytes32)": {
                details: string;
                params: {
                    amount: string;
                    deadline: string;
                    fee: string;
                    kappa: string;
                    minDy: string;
                    pool: string;
                    to: string;
                    token: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
                };
            };
            "paused()": {
                details: string;
            };
            "redeem(address,uint256,address,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    to: string;
                    token: string;
                };
            };
            "redeemAndRemove(address,uint256,address,uint256,uint8,uint256,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    swapDeadline: string;
                    swapMinAmount: string;
                    swapTokenIndex: string;
                    to: string;
                    token: string;
                };
            };
            "redeemAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    deadline: string;
                    minDy: string;
                    to: string;
                    token: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
                };
            };
            "renounceRole(bytes32,address)": {
                details: string;
            };
            "revokeRole(bytes32,address)": {
                details: string;
            };
            "withdraw(address,address,uint256,uint256,bytes32)": {
                params: {
                    amount: string;
                    fee: string;
                    kappa: string;
                    to: string;
                    token: string;
                };
            };
            "withdrawAndRemove(address,address,uint256,uint256,address,uint8,uint256,uint256,bytes32)": {
                params: {
                    amount: string;
                    fee: string;
                    kappa: string;
                    pool: string;
                    swapDeadline: string;
                    swapMinAmount: string;
                    swapTokenIndex: string;
                    to: string;
                    token: string;
                };
            };
            "withdrawFees(address,address)": {
                params: {
                    to: string;
                    token: string;
                };
            };
        };
        version: number;
    };
    userdoc: {
        kind: string;
        methods: {
            "deposit(address,uint256,address,uint256)": {
                notice: string;
            };
            "depositAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": {
                notice: string;
            };
            "mint(address,address,uint256,uint256,bytes32)": {
                notice: string;
            };
            "mintAndSwap(address,address,uint256,uint256,address,uint8,uint8,uint256,uint256,bytes32)": {
                notice: string;
            };
            "redeem(address,uint256,address,uint256)": {
                notice: string;
            };
            "redeemAndRemove(address,uint256,address,uint256,uint8,uint256,uint256)": {
                notice: string;
            };
            "redeemAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": {
                notice: string;
            };
            "withdraw(address,address,uint256,uint256,bytes32)": {
                notice: string;
            };
            "withdrawAndRemove(address,address,uint256,uint256,address,uint8,uint256,uint256,bytes32)": {
                notice: string;
            };
            "withdrawFees(address,address)": {
                notice: string;
            };
        };
        version: number;
    };
};
export default ABI;
