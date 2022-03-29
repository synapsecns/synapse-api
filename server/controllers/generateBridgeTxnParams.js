import {BigNumber} from "ethers";
import { Bridges } from "../utils/bridges.js";
import {Tokens} from "@synapseprotocol/sdk";
import * as ChainUtils from "../utils/chainUtils.js";
import * as TokenUtils from "../utils/tokenUtils.js";

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
    try {
        const fromChainId = ChainUtils.getIdFromRequestQueryParam(fromChain)
        const toChainId = ChainUtils.getIdFromRequestQueryParam(toChain)

        const fromTokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(fromToken)
        const fromTokenObj = TokenUtils.getObjectFromSymbol(fromTokenSymbol)

        const toTokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(fromToken)
        const toTokenObj = TokenUtils.getObjectFromSymbol(toTokenSymbol)

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
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export { generateBridgeTxnParams };
