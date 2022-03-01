import { JsonRpcProvider } from "@ethersproject/providers";
export declare function newProviderForNetwork(chainId: number): JsonRpcProvider;
export declare function rpcUriForChainId(chainId: number): string;
