import * as TokenUtils from "../utils/tokenUtils.js"

/**
 * @param {number} chainId
 * @returns {number[]}
 */
async function getBridgeableTokensForChain(chainId) {
    let tokenList = TokenUtils.getObjects();
    TokenUtils.getObjects().forEach(tokenObj => {
        if (chainId in tokenObj.addresses) {
            tokenList.push(tokenObj)
        }
    })
    return tokenList;
}

export { getBridgeableTokensForChain };