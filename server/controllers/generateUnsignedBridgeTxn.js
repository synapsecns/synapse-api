import {BigNumber} from "ethers";
import { Bridges } from "../core/cache.js";
import {getChainIdFromParam, getTokenSymbolFromParam} from "../core/utils.js";
import {Tokens} from "@synapseprotocol/sdk";

/**
 * @param {String} fromChainId
 * @param {String} toChainId
 * @param {String} fromToken
 * @param {String} toToken
 * @param {String} amount
 * @param {String} address
 * @returns {Object[]}
 */
async function generateUnsignedBridgeTxn(fromChainId, toChainId, fromToken, toToken, amount, address) {
    const fromChainIdNum = getChainIdFromParam(fromChainId)
    const toChainIdNum = getChainIdFromParam(toChainId)

    const fromTokenSymbol = getTokenSymbolFromParam(fromToken)
    const fromTokenObj = Tokens[fromTokenSymbol]

    const toTokenSymbol = getTokenSymbolFromParam(fromToken)
    const toTokenObj = Tokens[toTokenSymbol]

    const bigNumAmount = BigNumber.from(amount);

    const bridge = Bridges[fromChainIdNum];

    const estimate = await bridge.estimateBridgeTokenOutput({
        tokenFrom: fromTokenObj,
        tokenTo: toTokenObj,
        chainIdTo: toChainIdNum,
        amountFrom: bigNumAmount
    });
    const unsignedTxn = await bridge.buildBridgeTokenTransaction({
        tokenFrom: fromTokenObj,
        chainIdTo: toChainIdNum,
        tokenTo: toTokenObj,
        amountFrom: bigNumAmount,
        amountTo: estimate.amountToReceive,
        addressTo: address
    })

    return {
        data: unsignedTxn.data,
        to: unsignedTxn.to,
        gasPrice: unsignedTxn.gasPrice.toString(),
        gasLimit: unsignedTxn.gasPrice.toString(),
    }
}

export { generateUnsignedBridgeTxn };
