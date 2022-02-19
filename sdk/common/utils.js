import { ChainId } from "./chainid.js";
import { SynapseContracts } from "./synapse_contracts.js";
export const rejectPromise = (e) => Promise.reject(e instanceof Error ? e : new Error(e));
export const executePopulatedTransaction = (populatedTxn, signer) => populatedTxn
    .then((populatedTxn) => signer.sendTransaction(populatedTxn))
    .catch(rejectPromise);
export function contractAddressFor(chainId, key) {
    const { address } = contractsForChainId(chainId)[key];
    return address;
}
const CHAINID_CONTRACTS_MAP = {
    [ChainId.ETH]: SynapseContracts.Ethereum,
    [ChainId.OPTIMISM]: SynapseContracts.Optimism,
    [ChainId.BSC]: SynapseContracts.BSC,
    [ChainId.POLYGON]: SynapseContracts.Polygon,
    [ChainId.FANTOM]: SynapseContracts.Fantom,
    [ChainId.BOBA]: SynapseContracts.Boba,
    [ChainId.MOONBEAM]: SynapseContracts.Moonbeam,
    [ChainId.MOONRIVER]: SynapseContracts.Moonriver,
    [ChainId.ARBITRUM]: SynapseContracts.Arbitrum,
    [ChainId.AVALANCHE]: SynapseContracts.Avalanche,
    [ChainId.AURORA]: SynapseContracts.Aurora,
    [ChainId.HARMONY]: SynapseContracts.Harmony,
};
export const contractsForChainId = (chainId) => CHAINID_CONTRACTS_MAP[chainId] ?? null;
