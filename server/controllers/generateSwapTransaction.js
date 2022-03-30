import {Tokens, TokenSwap} from "@synapseprotocol/sdk";

import * as ChainUtils from "../utils/chainUtils.js";
import * as TokenUtils from "../utils/tokenUtils.js";
import {BigNumber} from "ethers";

/**
 * @param {String} chain
 * @param {String} fromToken
 * @param {String} toToken
 * @param {String} amountIn
 *
 * @returns {number[]}
 */
async function generateSwapTransaction(chain, fromToken, toToken, amountIn) {
    try {
        const chainId = ChainUtils.getIdFromRequestQueryParam(chain)

        const fromTokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(fromToken)
        const fromTokenObj = Tokens[fromTokenSymbol]

        const toTokenSymbol = TokenUtils.getSymbolFromRequestQueryParam(toToken)
        const toTokenObj = Tokens[toTokenSymbol]

        const bigNumAmountIn = BigNumber.from(amountIn);

        let args = {
            chainId: chainId,
            tokenFrom: fromTokenObj,
            tokenTo: toTokenObj,
            amountIn: bigNumAmountIn,
        }

        let swapRate = await TokenSwap.calculateSwapRate(args);

        let swapTransaction = await TokenSwap.buildSwapTokensTransaction({
            minAmountOut: swapRate.amountOut,
            ...args,
        })

        return {
            allowanceTarget: fromTokenObj.addresses[chainId],
            minAmountOut: swapRate.amountOut.toString(),
            ...swapTransaction,
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export { generateSwapTransaction };
