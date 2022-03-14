import * as ChainUtils from "../utils/chainUtils.js";
import * as TokenUtils from "../utils/tokenUtils.js";

/**
 * @param {String} tokenSymbol
 * @returns {Object[]}
 */
async function getChainsForToken(tokenSymbol) {
    let chainObjects = []

    let token = TokenUtils.getObjectFromSymbol(tokenSymbol);
    for (const [chainId, _] of Object.entries(token.addresses)) {
        const chainObj = ChainUtils.getObjectFromId(chainId)
        chainObjects.push(chainObj);
    }

    return chainObjects;
}

export {getChainsForToken}