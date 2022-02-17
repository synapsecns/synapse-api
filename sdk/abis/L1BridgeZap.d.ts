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
        details: string;
        kind: string;
        methods: {
            "calculateRemoveLiquidityOneToken(uint256,uint8)": {
                params: {
                    tokenAmount: string;
                    tokenIndex: string;
                };
                returns: {
                    availableTokenAmount: string;
                };
            };
            "calculateTokenAmount(uint256[],bool)": {
                details: string;
                params: {
                    amounts: string;
                    deposit: string;
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
            "depositETH(address,uint256,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    to: string;
                };
            };
            "depositETHAndSwap(address,uint256,uint256,uint8,uint8,uint256,uint256)": {
                params: {
                    amount: string;
                    chainId: string;
                    deadline: string;
                    minDy: string;
                    to: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
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
            "zapAndDeposit(address,uint256,address,uint256[],uint256,uint256)": {
                params: {
                    chainId: string;
                    deadline: string;
                    liquidityAmounts: string;
                    minToMint: string;
                    to: string;
                    token: string;
                };
            };
            "zapAndDepositAndSwap(address,uint256,address,uint256[],uint256,uint256,uint8,uint8,uint256,uint256)": {
                params: {
                    chainId: string;
                    liqDeadline: string;
                    liquidityAmounts: string;
                    minDy: string;
                    minToMint: string;
                    swapDeadline: string;
                    to: string;
                    token: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
                };
            };
        };
        title: string;
        version: number;
    };
    userdoc: {
        kind: string;
        methods: {
            "calculateRemoveLiquidityOneToken(uint256,uint8)": {
                notice: string;
            };
            "calculateTokenAmount(uint256[],bool)": {
                notice: string;
            };
            constructor: string;
            "deposit(address,uint256,address,uint256)": {
                notice: string;
            };
            "depositAndSwap(address,uint256,address,uint256,uint8,uint8,uint256,uint256)": {
                notice: string;
            };
            "depositETH(address,uint256,uint256)": {
                notice: string;
            };
            "depositETHAndSwap(address,uint256,uint256,uint8,uint8,uint256,uint256)": {
                notice: string;
            };
            "redeem(address,uint256,address,uint256)": {
                notice: string;
            };
            "zapAndDeposit(address,uint256,address,uint256[],uint256,uint256)": {
                notice: string;
            };
            "zapAndDepositAndSwap(address,uint256,address,uint256[],uint256,uint256,uint8,uint8,uint256,uint256)": {
                notice: string;
            };
        };
        notice: string;
        version: number;
    };
};
export default ABI;
