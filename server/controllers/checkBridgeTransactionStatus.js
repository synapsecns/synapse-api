import { Bridges } from "../utils/bridges.js";
import * as ChainUtils from "../utils/chainUtils.js";
import {id as makeKappa} from "@ethersproject/hash";

/**
 * @param {String} toChain
 * @param {String} fromChainTxnHash
 * @returns {Object[]}
 */
async function checkBridgeTransactionStatus(toChain, fromChainTxnHash) {
    try {
        const toChainId = ChainUtils.getIdFromRequestQueryParam(toChain);
        const kappa = makeKappa(fromChainTxnHash);

        const bridgeInstance = Bridges[toChainId];
        return {
            "isComplete" : await bridgeInstance.kappaExists(kappa)
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export {checkBridgeTransactionStatus}