import { ChainId } from "./chainid.js";
import { SwapPools } from "../swappools.js";
import { Tokens } from "../tokens.js";
const ETH_TOKEN_CHAINS = [
    ChainId.ETH,
    ChainId.OPTIMISM,
    ChainId.FANTOM,
    ChainId.BOBA,
    ChainId.MOONBEAM,
    ChainId.ARBITRUM,
    ChainId.AVALANCHE,
];
export var Networks;
(function (Networks) {
    class Network {
        name;
        names;
        chainCurrency;
        chainId;
        tokens;
        tokenAddresses;
        constructor(args) {
            this.name = args.name;
            this.names = args.names || [];
            this.chainId = args.chainId;
            this.chainCurrency = args.chainCurrency;
            this.tokens = SwapPools.getAllSwappableTokensForNetwork(this.chainId);
            this.tokenAddresses = this.tokens.map((t) => t.address(this.chainId));
        }
        /**
         * Returns true if the Bridge Zap contract for this network
         * is a L2BridgeZap contract.
         * Currently, Ethereum mainnet is the only network for which the
         * Bridge Zap contract is a NerveBridgeZap contract.
         */
        get zapIsL2BridgeZap() {
            return this.chainId !== ChainId.ETH;
        }
        /**
         * Returns true if the passed token is available on this network.
         * @param {BaseToken|string} token Either an instance of {@link BaseToken}, or the address of a token contract.
         */
        supportsToken(token) {
            let checkSymbol = token.symbol;
            if (checkSymbol === "ETH") {
                return ETH_TOKEN_CHAINS.includes(this.chainId);
            }
            else if (token.isEqual(Tokens.WETH) && this.chainId === ChainId.ETH) {
                return true;
            }
            else if (token.isEqual(Tokens.AVWETH) && this.chainId === ChainId.AVALANCHE) {
                return true;
            }
            else if (token.isEqual(Tokens.WAVAX) && this.chainId === ChainId.AVALANCHE) {
                return true;
            }
            else if (token.isEqual(Tokens.WMOVR) && this.chainId === ChainId.MOONRIVER) {
                return true;
            }
            return this.tokenAddresses.includes(token.address(this.chainId));
        }
    }
    Networks.Network = Network;
    Networks.ETH = new Network({
        name: "Ethereum Mainnet",
        chainId: ChainId.ETH,
        chainCurrency: "ETH"
    });
    Networks.OPTIMISM = new Network({
        name: "Optimism",
        chainId: ChainId.OPTIMISM,
        chainCurrency: "ETH"
    });
    Networks.BSC = new Network({
        name: "Binance Smart Chain",
        chainId: ChainId.BSC,
        chainCurrency: "BNB",
    });
    Networks.POLYGON = new Network({
        name: "Polygon",
        chainId: ChainId.POLYGON,
        chainCurrency: "MATIC",
    });
    Networks.FANTOM = new Network({
        name: "Fantom",
        chainId: ChainId.FANTOM,
        chainCurrency: "FTM",
    });
    Networks.BOBA = new Network({
        name: "Boba Network",
        chainId: ChainId.BOBA,
        chainCurrency: "ETH",
    });
    Networks.MOONBEAM = new Network({
        name: "Moonbeam",
        chainId: ChainId.MOONBEAM,
        chainCurrency: "GLMR",
    });
    Networks.MOONRIVER = new Network({
        name: "Moonriver",
        chainId: ChainId.MOONRIVER,
        chainCurrency: "MOVR",
    });
    Networks.ARBITRUM = new Network({
        name: "Arbitrum",
        chainId: ChainId.ARBITRUM,
        chainCurrency: "ETH",
    });
    Networks.AVALANCHE = new Network({
        name: "Avalanche C-Chain",
        chainId: ChainId.AVALANCHE,
        chainCurrency: "AVAX",
    });
    Networks.AURORA = new Network({
        name: "Aurora",
        chainId: ChainId.AURORA,
        chainCurrency: "aETH",
    });
    Networks.HARMONY = new Network({
        name: "Harmony",
        chainId: ChainId.HARMONY,
        chainCurrency: "ONE",
    });
    const CHAINID_NETWORK_MAP = {
        [ChainId.ETH]: Networks.ETH,
        [ChainId.OPTIMISM]: Networks.OPTIMISM,
        [ChainId.BSC]: Networks.BSC,
        [ChainId.POLYGON]: Networks.POLYGON,
        [ChainId.FANTOM]: Networks.FANTOM,
        [ChainId.BOBA]: Networks.BOBA,
        [ChainId.MOONBEAM]: Networks.MOONBEAM,
        [ChainId.MOONRIVER]: Networks.MOONRIVER,
        [ChainId.ARBITRUM]: Networks.ARBITRUM,
        [ChainId.AVALANCHE]: Networks.AVALANCHE,
        [ChainId.AURORA]: Networks.AURORA,
        [ChainId.HARMONY]: Networks.HARMONY,
    };
    Networks.fromChainId = (chainId) => CHAINID_NETWORK_MAP[ChainId.asNumber(chainId)] ?? null;
    /**
     * Returns true if the passed network supports the passed token.
     * @param {Network | BigNumberish} network Either a {@link Network} instance, or the Chain ID of a supported network.
     * @param {BaseToken | string} token Either a {@link BaseToken} instance, or the address of a token contract.
     */
    function networkSupportsToken(network, token) {
        network = network instanceof Network ? network : Networks.fromChainId(network);
        return network.supportsToken(token);
    }
    Networks.networkSupportsToken = networkSupportsToken;
    Networks.supportedNetworks = () => Object.values(CHAINID_NETWORK_MAP);
})(Networks || (Networks = {}));
export const supportedNetworks = Networks.supportedNetworks;
