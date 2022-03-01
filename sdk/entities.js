import { SynapseBridgeFactory, L1BridgeZapFactory, L2BridgeZapFactory, BridgeConfigFactory, PoolConfigFactory, } from "./contracts.js";
import { contractAddressFor } from "./common/utils.js";
import { ChainId } from "./common/chainid.js";
import { newProviderForNetwork } from "./internal/rpcproviders.js";
export const newSynapseBridgeInstance = (params) => SynapseBridgeFactory.connect(params.address, params.signerOrProvider);
export const newL1BridgeZapInstance = (params) => L1BridgeZapFactory.connect(params.address, params.signerOrProvider);
export const newL2BridgeZapInstance = (params) => L2BridgeZapFactory.connect(params.address, params.signerOrProvider);
export var SynapseEntities;
(function (SynapseEntities) {
    const bridgeConfigAddress = "0x7fd806049608b7d04076b8187dd773343e0589e6", poolConfigAddress = "0xB34C67DB5F0Fd8D3D4238FD0A1cBbfD50a72e177";
    function synapseBridge(params) {
        const address = contractAddressFor(params.chainId, "bridge");
        return SynapseBridgeFactory.connect(address, params.signerOrProvider);
    }
    SynapseEntities.synapseBridge = synapseBridge;
    function l1BridgeZap(params) {
        const address = contractAddressFor(params.chainId, "bridge_zap");
        return L1BridgeZapFactory.connect(address, params.signerOrProvider);
    }
    SynapseEntities.l1BridgeZap = l1BridgeZap;
    function l2BridgeZap(params) {
        const address = contractAddressFor(params.chainId, "bridge_zap");
        return L2BridgeZapFactory.connect(address, params.signerOrProvider);
    }
    SynapseEntities.l2BridgeZap = l2BridgeZap;
    function zapBridge(params) {
        const address = contractAddressFor(params.chainId, "bridge_zap");
        if (params.chainId === ChainId.ETH) {
            return L1BridgeZapFactory.connect(address, params.signerOrProvider);
        }
        return L2BridgeZapFactory.connect(address, params.signerOrProvider);
    }
    SynapseEntities.zapBridge = zapBridge;
    function bridgeConfig() {
        const provider = newProviderForNetwork(ChainId.ETH);
        return BridgeConfigFactory.connect(bridgeConfigAddress, provider);
    }
    SynapseEntities.bridgeConfig = bridgeConfig;
    function poolConfig() {
        const provider = newProviderForNetwork(ChainId.ETH);
        return PoolConfigFactory.connect(poolConfigAddress, provider);
    }
    SynapseEntities.poolConfig = poolConfig;
})(SynapseEntities || (SynapseEntities = {}));
