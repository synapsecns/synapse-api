import { SynapseContracts } from "./synapse_contracts";
import { Signer } from "@ethersproject/abstract-signer";
import { PopulatedTransaction, ContractTransaction } from "@ethersproject/contracts";
export declare const rejectPromise: (e: any) => Promise<never>;
export declare const executePopulatedTransaction: (populatedTxn: Promise<PopulatedTransaction>, signer: Signer) => Promise<ContractTransaction>;
export declare function contractAddressFor(chainId: number, key: string): string;
export declare const contractsForChainId: (chainId: number) => SynapseContracts.SynapseContract;
