import {BigNumber} from "ethers";
import { Bridges } from "../core/cache.js";
import {getChainIdFromQueryParam, getTokenSymbolFromParam} from "../core/utils.js";
import {Tokens} from "@synapseprotocol/sdk";

/**
 * @param {String} fromChain
 * @param {String} toChain
 * @param {String} fromToken
 * @param {String} toToken
 * @param {String|undefined} amountFrom
 * @returns {Object[]}
 */
async function estimateBridgeOutputs(fromChain, toChain, fromToken, toToken, amountFrom) {
    const fromChainId = getChainIdFromQueryParam(fromChain)
    const toChainId = getChainIdFromQueryParam(toChain)

    const fromTokenSymbol = getTokenSymbolFromParam(fromToken)
    const fromTokenObj = Tokens[fromTokenSymbol]

    const toTokenSymbol = getTokenSymbolFromParam(fromToken)
    const toTokenObj = Tokens[toTokenSymbol]

    const bigNumAmount = amountFrom ? BigNumber.from(amountFrom) : null;

    const bridge = Bridges[fromChainId];

    const estimate = await bridge.estimateBridgeTokenOutput({
        tokenFrom: fromTokenObj,
        tokenTo: toTokenObj,
        chainIdTo: toChainId,
        amountFrom: bigNumAmount
    });

    return {
        amountToReceive: estimate.amountToReceive.toString(),
        bridgeFee: estimate.bridgeFee.toString(),
    }
}

export { estimateBridgeOutputs };
