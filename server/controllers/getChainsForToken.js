import {getTokenFromSymbol} from "../core/utils.js"
import * as ChainUtils from "../utils/ChainUtils.js";

/**
 * @param {String} tokenSymbol
 * @returns {Object[]}
 */
async function getChainsForToken(tokenSymbol) {
    let chainObjects = []

    let token = getTokenFromSymbol(tokenSymbol);
    for (const [chainId, _] of Object.entries(token.addresses)) {
        const chainObj = ChainUtils.getObjectFromId(chainId)
        chainObjects.push(chainObj);
    }

    return chainObjects;
}

export {getChainsForToken}