import { SwapPools } from "@synapseprotocol/sdk";

import * as TokenUtils from "../utils/tokenUtils.js"
import * as ChainUtils from "../utils/chainUtils.js";

/**
 * @param {String} chain
 * @returns {number[]}
 */
async function getBridgeableTokensForChain(chain) {
    let chainId = ChainUtils.getIdFromRequestQueryParam(chain)

    let tokenList = SwapPools.getAllSwappableTokensForNetwork(chainId);
    let resList = [];
    tokenList.forEach(tokenObj => {
        resList.push(TokenUtils.getObjectFromSymbol(tokenObj.symbol))
    })

    return resList;

}

export { getBridgeableTokensForChain };