// Preload a few things that will be heavily used across the app.

import {
  Bridge,
  ChainId,
  allNetworksSwapTokensMap,
} from "@synapseprotocol/sdk";

/**
 * @type {Record<number,Bridge.SynapseBridge>}
 */
const Bridges = {};
const allTokens = allNetworksSwapTokensMap();

ChainId.supportedChainIds().forEach((chainId) => {
  Bridges[chainId] = new Bridge.SynapseBridge({
    network: chainId,
  });
});

export { Bridges, allTokens };
