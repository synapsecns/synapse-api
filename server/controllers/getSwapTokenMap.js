import { networkSwapTokensMap } from "@synapseprotocol/sdk";
import * as ChainUtils from "../utils/chainUtils.js";
import {removeDecimalUnderscoreFromObject} from "../utils/responseUtils.js"

/**
 * @param {String} chainA
 * @param {String} chainB
 * @returns {Object[]}
 */
async function getSwapTokenMap(chainA, chainB) {
    try {
        const chainIdA = ChainUtils.getIdFromRequestQueryParam(chainA);
        const chainIdB = ChainUtils.getIdFromRequestQueryParam(chainB);

        let res = networkSwapTokensMap(chainIdA, chainIdB);
        removeDecimalUnderscoreFromObject(res)

        return res[chainIdB]
    } catch (err) {
        console.log(err);
        throw err
    }
}

export { getSwapTokenMap };
