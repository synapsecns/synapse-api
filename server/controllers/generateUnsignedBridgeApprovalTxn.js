import { Bridges } from "../utils/bridges.js";
import * as ChainUtils from "../utils/chainUtils.js";
import * as TokenUtils from "../utils/tokenUtils.js";
import {convertBigNumbersToStringForObject} from "../utils/responseUtils.js"

/**
 * @param {String} fromChain
 * @param {String} fromToken
 * @returns {Object[]}
 */
async function generateUnsignedBridgeApprovalTxn(fromChain, fromToken) {
    const fromChainId = ChainUtils.getIdFromRequestQueryParam(fromChain)

    const fromTokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(fromToken)
    const fromTokenAddress = TokenUtils.getChainAddressFromSymbol(fromTokenSymbol, fromChainId);

    const bridge = Bridges[fromChainId];

    try {
        const txn = await bridge.buildApproveTransaction({
            token: fromTokenAddress,
        });

        convertBigNumbersToStringForObject(txn);

        return {
            unsigned_data: txn.data,
            to: txn.to,
            chainId: txn.chainId,
            gasPrice: txn.gasPrice,
            gasLimit: txn.gasLimit
        }
    } catch (err) {
        console.log(err);
        throw err
    }
}

export { generateUnsignedBridgeApprovalTxn };
