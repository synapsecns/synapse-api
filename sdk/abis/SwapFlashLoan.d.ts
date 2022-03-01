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
    })[];
    devdoc: {
        details: string;
        kind: string;
        methods: {
            "addLiquidity(uint256[],uint256,uint256)": {
                params: {
                    amounts: string;
                    deadline: string;
                    minToMint: string;
                };
                returns: {
                    _0: string;
                };
            };
            "calculateRemoveLiquidity(uint256)": {
                params: {
                    amount: string;
                };
                returns: {
                    _0: string;
                };
            };
            "calculateRemoveLiquidityOneToken(uint256,uint8)": {
                params: {
                    tokenAmount: string;
                    tokenIndex: string;
                };
                returns: {
                    availableTokenAmount: string;
                };
            };
            "calculateSwap(uint8,uint8,uint256)": {
                params: {
                    dx: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
                };
                returns: {
                    _0: string;
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
            "flashLoan(address,address,uint256,bytes)": {
                params: {
                    amount: string;
                    params: string;
                    receiver: string;
                    token: string;
                };
            };
            "getA()": {
                details: string;
                returns: {
                    _0: string;
                };
            };
            "getAPrecise()": {
                details: string;
                returns: {
                    _0: string;
                };
            };
            "getAdminBalance(uint256)": {
                params: {
                    index: string;
                };
                returns: {
                    _0: string;
                };
            };
            "getToken(uint8)": {
                params: {
                    index: string;
                };
                returns: {
                    _0: string;
                };
            };
            "getTokenBalance(uint8)": {
                params: {
                    index: string;
                };
                returns: {
                    _0: string;
                };
            };
            "getTokenIndex(address)": {
                params: {
                    tokenAddress: string;
                };
                returns: {
                    _0: string;
                };
            };
            "getVirtualPrice()": {
                returns: {
                    _0: string;
                };
            };
            "initialize(address[],uint8[],string,string,uint256,uint256,uint256,address)": {
                params: {
                    _a: string;
                    _adminFee: string;
                    _fee: string;
                    _pooledTokens: string;
                    decimals: string;
                    lpTokenName: string;
                    lpTokenSymbol: string;
                    lpTokenTargetAddress: string;
                };
            };
            "owner()": {
                details: string;
            };
            "paused()": {
                details: string;
            };
            "rampA(uint256,uint256)": {
                params: {
                    futureA: string;
                    futureTime: string;
                };
            };
            "removeLiquidity(uint256,uint256[],uint256)": {
                details: string;
                params: {
                    amount: string;
                    deadline: string;
                    minAmounts: string;
                };
                returns: {
                    _0: string;
                };
            };
            "removeLiquidityImbalance(uint256[],uint256,uint256)": {
                params: {
                    amounts: string;
                    deadline: string;
                    maxBurnAmount: string;
                };
                returns: {
                    _0: string;
                };
            };
            "removeLiquidityOneToken(uint256,uint8,uint256,uint256)": {
                params: {
                    deadline: string;
                    minAmount: string;
                    tokenAmount: string;
                    tokenIndex: string;
                };
                returns: {
                    _0: string;
                };
            };
            "renounceOwnership()": {
                details: string;
            };
            "setAdminFee(uint256)": {
                params: {
                    newAdminFee: string;
                };
            };
            "setFlashLoanFees(uint256,uint256)": {
                params: {
                    newFlashLoanFeeBPS: string;
                    newProtocolFeeShareBPS: string;
                };
            };
            "setSwapFee(uint256)": {
                params: {
                    newSwapFee: string;
                };
            };
            "swap(uint8,uint8,uint256,uint256,uint256)": {
                params: {
                    deadline: string;
                    dx: string;
                    minDy: string;
                    tokenIndexFrom: string;
                    tokenIndexTo: string;
                };
            };
            "transferOwnership(address)": {
                details: string;
            };
        };
        title: string;
        version: number;
    };
    userdoc: {
        kind: string;
        methods: {
            "addLiquidity(uint256[],uint256,uint256)": {
                notice: string;
            };
            "calculateRemoveLiquidity(uint256)": {
                notice: string;
            };
            "calculateRemoveLiquidityOneToken(uint256,uint8)": {
                notice: string;
            };
            "calculateSwap(uint8,uint8,uint256)": {
                notice: string;
            };
            "calculateTokenAmount(uint256[],bool)": {
                notice: string;
            };
            "flashLoan(address,address,uint256,bytes)": {
                notice: string;
            };
            "getA()": {
                notice: string;
            };
            "getAPrecise()": {
                notice: string;
            };
            "getAdminBalance(uint256)": {
                notice: string;
            };
            "getToken(uint8)": {
                notice: string;
            };
            "getTokenBalance(uint8)": {
                notice: string;
            };
            "getTokenIndex(address)": {
                notice: string;
            };
            "getVirtualPrice()": {
                notice: string;
            };
            "initialize(address[],uint8[],string,string,uint256,uint256,uint256,address)": {
                notice: string;
            };
            "pause()": {
                notice: string;
            };
            "rampA(uint256,uint256)": {
                notice: string;
            };
            "removeLiquidity(uint256,uint256[],uint256)": {
                notice: string;
            };
            "removeLiquidityImbalance(uint256[],uint256,uint256)": {
                notice: string;
            };
            "removeLiquidityOneToken(uint256,uint8,uint256,uint256)": {
                notice: string;
            };
            "setAdminFee(uint256)": {
                notice: string;
            };
            "setFlashLoanFees(uint256,uint256)": {
                notice: string;
            };
            "setSwapFee(uint256)": {
                notice: string;
            };
            "stopRampA()": {
                notice: string;
            };
            "swap(uint8,uint8,uint256,uint256,uint256)": {
                notice: string;
            };
            "unpause()": {
                notice: string;
            };
            "withdrawAdminFees()": {
                notice: string;
            };
        };
        notice: string;
        version: number;
    };
};
export default ABI;
