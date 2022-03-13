import {BigNumber} from "ethers";
import { Bridges } from "../core/cache.js";
import {getTokenSymbolFromQueryParam} from "../core/utils.js";
import {Tokens} from "@synapseprotocol/sdk";
import * as ChainUtils from "../utils/chainUtils.js";

/**
 * @param {String} fromChain
 * @param {String} fromToken
 * @returns {Object[]}
 */
async function generateUnsignedBridgeApprovalTxn(fromChain, fromToken) {
    const fromChainId = ChainUtils.getIdFromRequestQueryParam(fromChain)
    const fromTokenSymbol = getTokenSymbolFromQueryParam(fromToken)

    const bridge = Bridges[fromChainId];

    try {
        const txn = await bridge.buildApproveTransaction({
            token: fromTokenSymbol,
        });
        return {
            unsigned_data: txn.data,
            to: txn.to,
            maxPriorityFeePerGas: txn.maxPriorityFeePerGas
        }
    } catch (err) {
        throw err
    }
}

export { generateUnsignedBridgeApprovalTxn };
