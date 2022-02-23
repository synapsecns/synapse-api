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
 * @returns {Object[]}
 */
async function estimateBridgeOutputs(fromChainId, toChainId, fromToken, toToken, amount) {
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

    return {
        amountToReceive: estimate.amountToReceive.toString(),
        bridgeFee: estimate.bridgeFee.toString(),
    }
}

export { estimateBridgeOutputs };
