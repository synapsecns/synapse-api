import { ContractInterface } from "@ethersproject/contracts";
export declare namespace SynapseContracts {
    interface abiAndAddress {
        address: string;
        abi: ContractInterface;
    }
    export class SynapseContract {
        readonly bridge: abiAndAddress;
        readonly bridge_zap: abiAndAddress;
        constructor(args: {
            bridge: string;
            bridge_zap: string;
            isEthMainnet?: boolean;
        });
    }
    export const Ethereum: SynapseContract;
    export const Optimism: SynapseContract;
    export const BSC: SynapseContract;
    export const Polygon: SynapseContract;
    export const Fantom: SynapseContract;
    export const Boba: SynapseContract;
    export const Moonbeam: SynapseContract;
    export const Moonriver: SynapseContract;
    export const Arbitrum: SynapseContract;
    export const Avalanche: SynapseContract;
    export const Aurora: SynapseContract;
    export const Harmony: SynapseContract;
    export {};
}
