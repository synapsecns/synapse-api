// Preload a few things that will be heavily used across the app.

const {
    Bridge,
    supportedChainIds,
    allNetworksSwapTokensMap,
} = require("../../../express-api/sdk/index.js");

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

module.exports = { Bridges, allTokens };
