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
 * @param {String|undefined} address
 * @returns {Object[]}
 */
async function generateUnsignedBridgeTxn(fromChain, toChain, fromToken, toToken, amountFrom, address) {
    const fromChainId = ChainUtils.getIdFromRequestQueryParam(fromChain)
    const toChainId = ChainUtils.getIdFromRequestQueryParam(toChain)

    const fromTokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(fromToken)
    const fromTokenObj = Tokens[fromTokenSymbol]

    const toTokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(toToken)
    const toTokenObj = Tokens[toTokenSymbol]

    const bigNumAmount = BigNumber.from(amountFrom);

    const bridge = Bridges[fromChainId];

    const estimate = await bridge.estimateBridgeTokenOutput({
        tokenFrom: fromTokenObj,
        tokenTo: toTokenObj,
        chainIdTo: toChainId,
        amountFrom: bigNumAmount
    });
    const unsignedTxn = await bridge.buildBridgeTokenTransaction({
        tokenFrom: fromTokenObj,
        chainIdTo: toChainId,
        tokenTo: toTokenObj,
        amountFrom: bigNumAmount,
        amountTo: estimate.amountToReceive,
        addressTo: address
    })

    return {
        unsigned_data: unsignedTxn.data,
        to: unsignedTxn.to,
        // Convert BigNumbers to String
        maxFeePerGas: unsignedTxn.maxFeePerGas.toString(),
        maxPriorityFeePerGas: unsignedTxn.maxPriorityFeePerGas.toString(),
        gasLimit: unsignedTxn.gasLimit.toString(),
    }
}

export { generateUnsignedBridgeTxn };
