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
        kind: string;
        methods: {
            "DOMAIN_SEPARATOR()": {
                details: string;
            };
            "allowance(address,address)": {
                details: string;
            };
            "approve(address,uint256)": {
                details: string;
            };
            "balanceOf(address)": {
                details: string;
            };
            "burn(uint256)": {
                details: string;
            };
            "burnFrom(address,uint256)": {
                details: string;
            };
            "decimals()": {
                details: string;
            };
            "decreaseAllowance(address,uint256)": {
                details: string;
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
            "increaseAllowance(address,uint256)": {
                details: string;
            };
            "initialize(string,string,uint8,address)": {
                params: {
                    decimals: string;
                    name: string;
                    owner: string;
                    symbol: string;
                };
            };
            "name()": {
                details: string;
            };
            "nonces(address)": {
                details: string;
            };
            "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": {
                details: string;
            };
            "renounceRole(bytes32,address)": {
                details: string;
            };
            "revokeRole(bytes32,address)": {
                details: string;
            };
            "symbol()": {
                details: string;
            };
            "totalSupply()": {
                details: string;
            };
            "transfer(address,uint256)": {
                details: string;
            };
            "transferFrom(address,address,uint256)": {
                details: string;
            };
        };
        version: number;
    };
    userdoc: {
        kind: string;
        methods: {
            "initialize(string,string,uint8,address)": {
                notice: string;
            };
        };
        version: number;
    };
};
export default ABI;
