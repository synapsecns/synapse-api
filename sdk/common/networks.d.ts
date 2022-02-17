import type { Token } from "../token";
import { BigNumberish } from "@ethersproject/bignumber";
export declare namespace Networks {
    class Network {
        readonly name: string;
        readonly names: string[];
        readonly chainCurrency: string;
        readonly chainId: number;
        readonly tokens: Token[];
        readonly tokenAddresses: string[];
        constructor(args: {
            name: string;
            names?: string[];
            chainId: number;
            chainCurrency: string;
        });
        get zapIsL2BridgeZap(): boolean;
        supportsToken(token: Token): boolean;
    }
    const ETH: Network;
    const OPTIMISM: Network;
    const BSC: Network;
    const POLYGON: Network;
    const FANTOM: Network;
    const BOBA: Network;
    const MOONBEAM: Network;
    const MOONRIVER: Network;
    const ARBITRUM: Network;
    const AVALANCHE: Network;
    const AURORA: Network;
    const HARMONY: Network;
    const fromChainId: (chainId: BigNumberish) => Network;
    function networkSupportsToken(network: Network | BigNumberish, token: Token): boolean;
    const supportedNetworks: () => Network[];
}
export declare const supportedNetworks: () => Networks.Network[];
