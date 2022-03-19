import { SwapPools } from "@synapseprotocol/sdk";

/**
 * @param {number} chainId
 * @returns {number[]}
 */
async function getSwappableTokens(chainId) {
    return {
        nUSD: SwapPools.stableswapPoolForNetwork(chainId),
        nETH: SwapPools.ethSwapPoolForNetwork(chainId),
    };
}

export { getSwappableTokens };
