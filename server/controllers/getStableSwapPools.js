import { SwapPools } from "@synapseprotocol/sdk";
import * as ChainUtils from "../utils/chainUtils.js";

function scrubResult(obj) {
    if (typeof obj === "object") {
        if (obj["_decimals"]) {
            obj["decimals"] = obj["_decimals"];
            delete obj["_decimals"];
        }

        for (let key in obj) {
            scrubResult(obj[key]);
        }
    }
}

/**
 * @param {String} chain
 * @returns {number[]}
 */
async function getStableSwapPools(chain) {
    try {
        const chainId = ChainUtils.getIdFromRequestQueryParam(chain);

        let res = {
            nUSD: SwapPools.stableswapPoolForNetwork(chainId),
            nETH: SwapPools.ethSwapPoolForNetwork(chainId),
        }

        scrubResult(res);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export { getStableSwapPools };
