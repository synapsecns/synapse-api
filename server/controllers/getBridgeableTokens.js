import {getAllTokensObj} from "../core/utils.js";

/**
 * @param {number} chainId
 * @returns {number[]}
 */
async function getBridgeableTokensForChain(chainId) {
    let tokenList = getAllTokensObj();
    getAllTokensObj().forEach(tokenObj => {
        if (chainId in tokenObj.addresses) {
            tokenList.push(tokenObj)
        }
    })
    return tokenList;
}

export { getBridgeableTokensForChain };