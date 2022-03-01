import { JsonRpcProvider } from "@ethersproject/providers";
import { ChainId } from "../common/chainid.js";
const ETH_RPC_URI_ENV = "ETH_RPC_URI", OPTIMISM_RPC_URI_ENV = "OPTIMISM_RPC_URI", BSC_RPC_URI_ENV = "BSC_RPC_URI", POLYGON_RPC_URI_ENV = "POLYGON_RPC_URI", FANTOM_RPC_URI_ENV = "FANTOM_RPC_URI", BOBA_RPC_URI_ENV = "BOBA_RPC_URI", MOONBEAM_RPC_URI_ENV = "MOONBEAM_RPC_URI", MOONRIVER_RPC_URI_ENV = "MOONRIVER_RPC_URI", ARBITRUM_RPC_URI_ENV = "ARBITRUM_RPC_URI", AVALANCHE_RPC_URI_ENV = "AVALANCHE_RPC_URI", AURORA_RPC_URI_ENV = "AURORA_RPC_URI", HARMONY_RPC_URI_ENV = "HARMONY_RPC_URI";
const ENV_KEY_MAP = {
    [ChainId.ETH]: ETH_RPC_URI_ENV,
    [ChainId.OPTIMISM]: OPTIMISM_RPC_URI_ENV,
    [ChainId.BSC]: BSC_RPC_URI_ENV,
    [ChainId.POLYGON]: POLYGON_RPC_URI_ENV,
    [ChainId.FANTOM]: FANTOM_RPC_URI_ENV,
    [ChainId.BOBA]: BOBA_RPC_URI_ENV,
    [ChainId.MOONBEAM]: MOONBEAM_RPC_URI_ENV,
    [ChainId.MOONRIVER]: MOONRIVER_RPC_URI_ENV,
    [ChainId.ARBITRUM]: ARBITRUM_RPC_URI_ENV,
    [ChainId.AVALANCHE]: AVALANCHE_RPC_URI_ENV,
    [ChainId.AURORA]: AURORA_RPC_URI_ENV,
    [ChainId.HARMONY]: HARMONY_RPC_URI_ENV,
};
const CHAIN_RPC_URIS = {
    [ChainId.ETH]: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    [ChainId.OPTIMISM]: "https://mainnet.optimism.io",
    [ChainId.BSC]: "https://bsc-dataseed1.binance.org/",
    [ChainId.POLYGON]: "https://polygon-rpc.com/",
    [ChainId.FANTOM]: "https://rpc.ftm.tools/",
    [ChainId.BOBA]: "https://replica-oolong.boba.network/",
    [ChainId.MOONBEAM]: "https://rpc.api.moonbeam.network",
    [ChainId.MOONRIVER]: "https://rpc.moonriver.moonbeam.network",
    [ChainId.ARBITRUM]: "https://arb1.arbitrum.io/rpc",
    [ChainId.AVALANCHE]: "https://api.avax.network/ext/bc/C/rpc",
    [ChainId.AURORA]: "https://mainnet.aurora.dev",
    [ChainId.HARMONY]: "https://api.harmony.one/",
};
const PROVIDERS = (() => {
    let m = {};
    ChainId.supportedChainIds().map((c) => {
        m[c] = new JsonRpcProvider(rpcUriForChainId(c));
    });
    return m;
})();
export function newProviderForNetwork(chainId) {
    return PROVIDERS[chainId] ?? null;
}
export function rpcUriForChainId(chainId) {
    return checkEnv(chainId) ?? CHAIN_RPC_URIS[chainId];
}
function checkEnv(chainId) {
    const envKey = ENV_KEY_MAP[chainId];
    if (envKey in process.env) {
        return process.env[envKey];
    }
    return undefined;
}
