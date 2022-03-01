import type { SynapseBridgeContract, L1BridgeZapContract, L2BridgeZapContract, GenericZapBridgeContract, BridgeConfigContract, PoolConfigContract } from "./contracts";
import type { SignerOrProvider } from "./common/types";
export declare const newSynapseBridgeInstance: (params: {
    address: string;
    signerOrProvider?: SignerOrProvider;
}) => SynapseBridgeContract;
export declare const newL1BridgeZapInstance: (params: {
    address: string;
    signerOrProvider?: SignerOrProvider;
}) => L1BridgeZapContract;
export declare const newL2BridgeZapInstance: (params: {
    address: string;
    signerOrProvider?: SignerOrProvider;
}) => L2BridgeZapContract;
export declare namespace SynapseEntities {
    function synapseBridge(params: {
        chainId: number;
        signerOrProvider?: SignerOrProvider;
    }): SynapseBridgeContract;
    function l1BridgeZap(params: {
        chainId: number;
        signerOrProvider?: SignerOrProvider;
    }): L1BridgeZapContract;
    function l2BridgeZap(params: {
        chainId: number;
        signerOrProvider?: SignerOrProvider;
    }): L2BridgeZapContract;
    function zapBridge(params: {
        chainId: number;
        signerOrProvider?: SignerOrProvider;
    }): GenericZapBridgeContract;
    function bridgeConfig(): BridgeConfigContract;
    function poolConfig(): PoolConfigContract;
}
