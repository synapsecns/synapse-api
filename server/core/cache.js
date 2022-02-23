// Preload a few things that will be heavily used across the app.

import {
    Bridge,
    supportedChainIds,
    allNetworksSwapTokensMap,
} from "@synapseprotocol/sdk";

/**
 * @type {Record<number,Bridge.SynapseBridge>}
 */
const Bridges = {};
const allTokens = allNetworksSwapTokensMap();

supportedChainIds().forEach((chainId) => {
    Bridges[chainId] = new Bridge.SynapseBridge({
        network: chainId,
    });
});

export { Bridges, allTokens };
