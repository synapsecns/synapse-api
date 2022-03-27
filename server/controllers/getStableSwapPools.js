import { SwapPools } from "@synapseprotocol/sdk";
import * as ChainUtils from "../utils/chainUtils.js";

/**
 * @param {String} chain
 * @returns {number[]}
 */
async function getStableSwapPools(chain) {
    try {
        const chainId = ChainUtils.getIdFromRequestQueryParam(chain);

        return {
            nUSD: SwapPools.stableswapPoolForNetwork(chainId),
            nETH: SwapPools.ethSwapPoolForNetwork(chainId),
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export { getStableSwapPools };
