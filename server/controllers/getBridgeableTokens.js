import * as TokenUtils from "../utils/tokenUtils.js"
import * as ChainUtils from "../utils/chainUtils.js";

/**
 * @param {String} chain
 * @returns {number[]}
 */
async function getBridgeableTokensForChain(chain) {
    let chainId = ChainUtils.getIdFromRequestQueryParam(chain)

    let tokenList = [];
    TokenUtils.getObjects().forEach(tokenObj => {
        if (chainId in tokenObj.addresses) {
            tokenList.push(tokenObj)
        }
    })
    return tokenList;
}

export { getBridgeableTokensForChain };