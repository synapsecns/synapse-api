import {getTokenFromSymbol, getChainFromId} from "../core/utils.js"

/**
 * @param {String} tokenSymbol
 * @returns {Object[]}
 */
async function getChainsForToken(tokenSymbol) {
    let chainObjects = []

    let token = getTokenFromSymbol(tokenSymbol);
    for (const [chainId, _] of Object.entries(token.addresses)) {
        const chainObj = getChainFromId(chainId)
        chainObjects.push(chainObj);
    }

    return chainObjects;
}

export {getChainsForToken}