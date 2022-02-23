import * as tokens from "../core/tokens.js"

/**
 * @param {number} chainId
 * @returns {number[]}
 */
function getBridgeableTokensForChain(chainId) {
    let tokenList = []
    for (const [_, tokenObj] of Object.entries(tokens)) {
        if (chainId in tokenObj.addresses) {
            tokenList.push(tokenObj)
        }
    }
    return tokenList;
}

export { getBridgeableTokensForChain };
