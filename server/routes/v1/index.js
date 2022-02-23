import express from "express";
const router = express.Router();

import {check, oneOf, validationResult} from "express-validator";
import {getBridgeableTokensForChain} from "../../controllers/getBridgeableTokens.js"
import {getChainsForToken} from "../../controllers/getChainsForToken.js"
import {estimateBridgeOutputs} from "../../controllers/estimateBridgeOutputs.js"
import {getChainNames, getChainIds, getChainIdFromParam, getTokenSymbols, getTokenHashes, getTokenSymbolFromParam} from "../../core/utils.js"
import {BigNumber} from "ethers";

/***
 * /v1/get_bridgable_tokens?chainId=1
 */
router.get('/get_bridgable_tokens',
    oneOf([check('chainId').isIn(getChainNames()), check('chainId').isIn(getChainIds())]),
    (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid chainId must be passed"});
            return;
        }

        const chainId = getChainIdFromParam(req.query.chainId)
        const tokenList = getBridgeableTokensForChain(chainId)

        res.status(200).json(tokenList);
    });


/***
 * /v1/get_chains_for_token?token_address=<address>
 */
router.get('/get_chains_for_token',
    oneOf([check('token').isIn(getTokenSymbols()), check('token').isIn(getTokenHashes())]),
    (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid token must be passed"});
            return;
        }

        const tokenSymbol = getTokenSymbolFromParam(req.query.token)
        const tokenList = getChainsForToken(tokenSymbol)

        res.status(200).json(tokenList);
    });

/***
 * estimateBridgeOutput(fromChainId, toChainId, fromCoin, toCoin, inputTokenAmount) =>
 * {estimatedRecieveAmount, otherInfo...}
 * /v1/estimate_bridge_output?fromChainId=1&toChainId=56&fromToken="USDC"...input_token_amount=<BigNumber value>
 */
router.get('/estimate_bridge_output',
    oneOf([check('fromChainId').isIn(getChainNames()), check('fromChainId').isIn(getChainIds())]),
    oneOf([check('toChainId').isIn(getChainNames()), check('toChainId').isIn(getChainNames())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenHashes())]),
    oneOf([check('toToken').isIn(getTokenSymbols()), check('toToken').isIn(getTokenHashes())]),
    async (req, res) => {

        try {
            BigNumber.from(req.query.amount)
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChainId, toChainId, fromCoin, toCoin and inputTokenAmount must be passed"});
            return;
        }

        const {fromChainId, toChainId, fromToken, toToken, amount} = req.query

        const estimate = await estimateBridgeOutputs(fromChainId, toChainId, fromToken, toToken, amount);
        res.status(200).json(estimate);
    });

/***
 * generateUnsignedBridgeApprovalTxn(fromChainId, fromCoin) =>
 * {unsigned_data: , otherInfo...} /v1/generate_unsigned_bridge_approval_txn?fromChainId=1&fromCoin="USDC"...
 * Generates the unsigned txn data for approval transaction required for approving spend of a given coin
 ***/
router.get('/generate_unsigned_bridge_approval_txn', (request, response) => {

});

/***
 * generateUnsignedBridgeTxn(fromChainId, toChainId, fromCoin, toCoin) =>
 * {unsigned_data: , otherInfo...} /v1/generate_unsigned_bridge_txn?fromChainId=1&toChainId=56&fromCoin="USDC"...
 */
router.get('/generate_unsigned_bridge_txn', (request, response) => {
    response.send(`users`);
});

/***
 * generateBridgeTxnParams(fromChainId, toChainId, fromCoin, toCoin) =>
 * /v1/generate_unsigned_bridge_txn?fromChainId=1&toChainId=56&fromCoin="USDC"...
 */
router.get('/generate_unsigned_bridge_txn', (request, response) => {
    response.send(`users`);
});


export default router;
