import * as ChainUtils from "../utils/chainUtils.js";
import * as TokenUtils from "../utils/tokenUtils.js";

/**
 * @param {String} token
 * @returns {Object[]}
 */
async function getChainsForToken(token) {
    try {
        const tokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(token)

        let chainObjects = []

        let tokenObj = TokenUtils.getObjectFromSymbol(tokenSymbol);
        for (const [chainId, _] of Object.entries(tokenObj.addresses)) {
            const chainObj = ChainUtils.getObjectFromId(chainId)
            chainObjects.push(chainObj);
        }

        return chainObjects;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export {getChainsForToken}