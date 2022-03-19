import {
    Bridge,
    supportedChainIds,
} from "@synapseprotocol/sdk";

// TODO: Cache as function

/**
 * @type {Record<number,Bridge.SynapseBridge>}
 */
const Bridges = {};

supportedChainIds().forEach((chainId) => {
    Bridges[chainId] = new Bridge.SynapseBridge({
        network: chainId,
    });
});

export { Bridges };
