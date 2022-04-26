import { SwapPools } from "@synapseprotocol/sdk";

import * as TokenUtils from "../utils/tokenUtils.js"
import * as ChainUtils from "../utils/chainUtils.js";

/**
 * @param {String} chain
 * @returns {number[]}
 */
async function getBridgeableTokens(chain) {
    try {

        // Return bridgeable tokens only for chain specified
        if (chain) {

            let chainId = ChainUtils.getIdFromRequestQueryParam(chain)

            let tokenList = SwapPools.getAllSwappableTokensForNetwork(chainId);
            let resList = [];

            // Compare objects directly, as the `symbol` attribute could conflict
            // For eg, USDC and DFK_USDC have the same symbol in the `Tokens` Object
            tokenList.forEach(tokenObj => {
                resList.push(TokenUtils.getJSONFromBaseObject(tokenObj))
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