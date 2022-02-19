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
        /**
         * Returns true if the Bridge Zap contract for this network
         * is a L2BridgeZap contract.
         * Currently, Ethereum mainnet is the only network for which the
         * Bridge Zap contract is a NerveBridgeZap contract.
         */
        get zapIsL2BridgeZap(): boolean;
        /**
         * Returns true if the passed token is available on this network.
         * @param {BaseToken|string} token Either an instance of {@link BaseToken}, or the address of a token contract.
         */
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
    /**
     * Returns true if the passed network supports the passed token.
     * @param {Network | BigNumberish} network Either a {@link Network} instance, or the Chain ID of a supported network.
     * @param {BaseToken | string} token Either a {@link BaseToken} instance, or the address of a token contract.
     */
    function networkSupportsToken(network: Network | BigNumberish, token: Token): boolean;
    const supportedNetworks: () => Network[];
}
export declare const supportedNetworks: () => Networks.Network[];
