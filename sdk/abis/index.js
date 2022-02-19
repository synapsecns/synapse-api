import SynapseBridgeABI from "./SynapseBridge.js";
import SynapseERC20ABI from "./SynapseERC20.js";
import L2BridgeZapABI from "./L2BridgeZap.js";
import L1BridgeZapABI from "./L1BridgeZap.js";
export var ABIs;
(function (ABIs) {
    ABIs.SynapseBridge = SynapseBridgeABI.abi, ABIs.L1BridgeZap = L1BridgeZapABI.abi, ABIs.L2BridgeZap = L2BridgeZapABI.abi, ABIs.SynapseERC20 = SynapseERC20ABI.abi;
})(ABIs || (ABIs = {}));
