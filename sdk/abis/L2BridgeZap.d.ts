declare const ABI: {
    abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
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
    })[];
    devdoc: {
        kind: string;
        methods: {
            "calculateSwap(address,uint8,uint8,uint256)": {
                params: {
                    dx: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
                };
                returns: {
                    _0: string;
                };
            };
            "deposit(address,uint256,address,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    to: string;
                    token: string;
                };
            };
            "depositETH(address,uint256,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    to: string;
                };
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
                    liqDeadline: string;
                    liqMinAmount: string;
                    liqTokenIndex: string;
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
        };
        version: number;
    };
    userdoc: {
        kind: string;
        methods: {
            "calculateSwap(address,uint8,uint8,uint256)": {
                notice: string;
            };
            "deposit(address,uint256,address,uint256)": {
                notice: string;
            };
            "depositETH(address,uint256,uint256)": {
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
        };
        version: number;
    };
};
export default ABI;
