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
            "renounceRole(bytes32,address)": {
                details: string;
            };
            "revokeRole(bytes32,address)": {
                details: string;
            };
        };
        version: number;
    };
    userdoc: {
        kind: string;
        methods: {};
        version: number;
    };
};
export default ABI;
