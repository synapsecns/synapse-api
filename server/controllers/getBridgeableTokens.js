import { SwapPools } from "@synapseprotocol/sdk";

import * as TokenUtils from "../utils/tokenUtils.js"
import * as ChainUtils from "../utils/chainUtils.js";
import {getAllBridgeableTokens} from "../utils/tokenUtils.js";

/**
 * @param {String} chain
 * @returns {number[]}
 */
async function getBridgeableTokens(chain) {
    try {
        if (chain) {

            // Return bridgeable tokens only for chain specified
            let chainId = ChainUtils.getIdFromRequestQueryParam(chain)

            let tokenList = SwapPools.getAllSwappableTokensForNetwork(chainId);
            let resList = [];
            tokenList.forEach(tokenObj => {
                resList.push(TokenUtils.getObjectFromSymbol(tokenObj.symbol))
            })
            return resList;
        } else {

            // Return all bridgeable tokens
            return TokenUtils.getAllBridgeableTokens();
        }
    } catch (err) {
        console.error(err);
        throw (err);
    }
}

export { getBridgeableTokens };