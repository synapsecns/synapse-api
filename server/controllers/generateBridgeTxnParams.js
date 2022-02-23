import {BigNumber} from "ethers";
import { Bridges } from "../core/cache.js";
import {getChainIdFromParam, getTokenSymbolFromParam} from "../core/utils.js";
import {Tokens} from "@synapseprotocol/sdk";

/**
 * @param {String} fromChain
 * @param {String} toChain
 * @param {String} fromToken
 * @param {String} toToken
 * @param {String} amountFrom
 * @param {String} amountTo
 * @param {String|undefined} addressTo
 * @returns {Object[]}
 */
async function generateBridgeTxnParams(fromChain, toChain, fromToken, toToken, amountFrom, amountTo, addressTo) {
    const fromChainId = getChainIdFromParam(fromChain)
    const toChainId = getChainIdFromParam(toChain)

    const fromTokenSymbol = getTokenSymbolFromParam(fromToken)
    const fromTokenObj = Tokens[fromTokenSymbol]

    const toTokenSymbol = getTokenSymbolFromParam(fromToken)
    const toTokenObj = Tokens[toTokenSymbol]

    const bigNumAmountFrom = BigNumber.from(amountFrom);
    const bigNumAmountTo = BigNumber.from(amountTo);

    const bridge = Bridges[fromChainId];

    return {
        tokenFrom: fromTokenObj,
        tokenTo: toTokenObj,
        chainIdTo: toChainId,
        amountFrom: bigNumAmountFrom,
        amountTo: bigNumAmountTo,
        addressTo: addressTo
    }
}

export { generateBridgeTxnParams };
