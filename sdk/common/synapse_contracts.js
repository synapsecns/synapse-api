import { ABIs } from "../abis/index.js";
export var SynapseContracts;
(function (SynapseContracts) {
    class SynapseContract {
        bridge;
        bridge_zap;
        constructor(args) {
            let { bridge, bridge_zap, isEthMainnet = false } = args;
            this.bridge = { address: bridge, abi: ABIs.SynapseBridge };
            this.bridge_zap = {
                address: bridge_zap,
                abi: isEthMainnet ? ABIs.L1BridgeZap : ABIs.L2BridgeZap,
            };
        }
    }
    SynapseContracts.SynapseContract = SynapseContract;
    SynapseContracts.Ethereum = new SynapseContract({
        bridge: "0x2796317b0fF8538F253012862c06787Adfb8cEb6",
        bridge_zap: "0x6571d6be3d8460CF5F7d6711Cd9961860029D85F",
        isEthMainnet: true,
    });
    SynapseContracts.Optimism = new SynapseContract({
        bridge: "0xAf41a65F786339e7911F4acDAD6BD49426F2Dc6b",
        bridge_zap: "0x9CD619c50562a38edBdC3451ade7B58CaA71Ab32",
    });
    SynapseContracts.BSC = new SynapseContract({
        bridge: "0xd123f70AE324d34A9E76b67a27bf77593bA8749f",
        bridge_zap: "0x749F37Df06A99D6A8E065dd065f8cF947ca23697",
    });
    SynapseContracts.Polygon = new SynapseContract({
        bridge: "0x8F5BBB2BB8c2Ee94639E55d5F41de9b4839C1280",
        bridge_zap: "0x1c6aE197fF4BF7BA96c66C5FD64Cb22450aF9cC8",
    });
    SynapseContracts.Fantom = new SynapseContract({
        bridge: "0xAf41a65F786339e7911F4acDAD6BD49426F2Dc6b",
        bridge_zap: "0x64B4097bCCD27D49BC2A081984C39C3EeC427a2d",
    });
    SynapseContracts.Boba = new SynapseContract({
        bridge: "0x432036208d2717394d2614d6697c46DF3Ed69540",
        bridge_zap: "0x64B4097bCCD27D49BC2A081984C39C3EeC427a2d",
    });
    SynapseContracts.Moonbeam = new SynapseContract(({
        bridge: "0x84A420459cd31C3c34583F67E0f0fB191067D32f",
        bridge_zap: "0x73783F028c60D463bc604cc53852C37C31dEC5e9",
    }));
    SynapseContracts.Moonriver = new SynapseContract(({
        bridge: "0xaeD5b25BE1c3163c907a471082640450F928DDFE",
        bridge_zap: "0xfA28DdB74b08B2b6430f5F61A1Dd5104268CC29e",
    }));
    SynapseContracts.Arbitrum = new SynapseContract({
        bridge: "0x6F4e8eBa4D337f874Ab57478AcC2Cb5BACdc19c9",
        bridge_zap: "0x26532682E1830cDACcCbb7e385Cff6de14dD08D8",
    });
    SynapseContracts.Avalanche = new SynapseContract({
        bridge: "0xC05e61d0E7a63D27546389B7aD62FdFf5A91aACE",
        bridge_zap: "0xE85429C97589AD793Ca11A8BC3477C03d27ED140",
    });
    SynapseContracts.Aurora = new SynapseContract({
        bridge: "0xaeD5b25BE1c3163c907a471082640450F928DDFE",
        bridge_zap: "0x2D8Ee8d6951cB4Eecfe4a79eb9C2F973C02596Ed",
    });
    SynapseContracts.Harmony = new SynapseContract({
        bridge: "0xAf41a65F786339e7911F4acDAD6BD49426F2Dc6b",
        bridge_zap: "0xB729B5bAD4B42f3bDd4A3518a1Cc00178cb5920a",
    });
})(SynapseContracts || (SynapseContracts = {}));
