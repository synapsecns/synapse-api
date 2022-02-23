import express from "express";
const router = express.Router();

import {check, oneOf,query, validationResult} from "express-validator";
import {getBridgeableTokensForChain} from "../../controllers/getBridgeableTokens.js"
import {getChainsForToken} from "../../controllers/getChainsForToken.js"
import {estimateBridgeOutputs} from "../../controllers/estimateBridgeOutputs.js"
import {generateUnsignedBridgeTxn} from "../../controllers/generateUnsignedBridgeTxn.js"
import {generateUnsignedBridgeApprovalTxn} from "../../controllers/generateUnsignedBridgeApprovalTxn.js"
import {generateBridgeTxnParams} from "../../controllers/generateBridgeTxnParams.js"

import {
    getChainIdFromParam,
    getChainIds,
    getChainNames,
    getTokenHashes,
    getTokenSymbolFromParam,
    getTokenSymbols
} from "../../core/utils.js"
import {BigNumber} from "ethers";


/***
 * /v1/get_bridgable_tokens?chainId=1
 */
router.get('/get_bridgable_tokens',
    oneOf([check('chainId').isIn(getChainNames()), check('chainId').isIn(getChainIds())]),
    async (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid chainId must be passed"});
            return;
        }

        try {
            const chainId = getChainIdFromParam(req.query.chainId)
            const tokenList = await getBridgeableTokensForChain(chainId)
            res.status(200).json(tokenList);
        } catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }
    });


/***
 * /v1/get_chains_for_token?token_address=<address>
 */
router.get('/get_chains_for_token',
    oneOf([check('token').isIn(getTokenSymbols()), check('token').isIn(getTokenHashes())]),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid token must be passed"});
            return;
        }

        try {
            const tokenSymbol = getTokenSymbolFromParam(req.query.token)
            const tokenList = await getChainsForToken(tokenSymbol)
            res.status(200).json(tokenList);
        }  catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }

    });

/***
 * estimateBridgeOutput(fromChain, toChain, fromToken, toToken, input) =>
 * {estimatedRecieveAmount, otherInfo...}
 * /v1/estimate_bridge_output?fromChainId=1&toChain=56&fromToken="USDC"...input_token_amount=<BigNumber value>
 */
router.get('/estimate_bridge_output',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds())]),
    oneOf([check('toChain').isIn(getChainNames()), check('toChain').isIn(getChainNames())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenHashes())]),
    oneOf([check('toToken').isIn(getTokenSymbols()), check('toToken').isIn(getTokenHashes())]),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChainId, toChain, fromToken, toToken and amountFrom must be passed"});
            return;
        }

        try {
            const {fromChain, toChain, fromToken, toToken, amountFrom} = req.query
            const estimate = await estimateBridgeOutputs(fromChain, toChain, fromToken, toToken, amountFrom);
            res.status(200).json(estimate);
        } catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }
    });


/***
 * generateUnsignedBridgeTxn(fromChain, toChain, fromCoin, toCoin) =>
 * {unsigned_data: , otherInfo...} /v1/generate_unsigned_bridge_txn?fromChain=1&toChain=56&fromCoin="USDC"...
 */
router.get('/generate_unsigned_bridge_txn',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds())]),
    oneOf([check('toChain').isIn(getChainNames()), check('toChain').isIn(getChainNames())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenHashes())]),
    oneOf([check('toToken').isIn(getTokenSymbols()), check('toToken').isIn(getTokenHashes())]),
    async (req, res) => {

        try {
            validationResult(req).throw();
            BigNumber.from(req.query.amountFrom);
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChain, toChain, fromToken, toToken, amountFrom and address must be passed"});
            return;
        }

        try {
            const {fromChain, toChain, fromToken, toToken, amountFrom, address} = req.query
            const unsignedTxn = await generateUnsignedBridgeTxn(fromChain, toChain, fromToken, toToken, amountFrom, address);
            res.status(200).json(unsignedTxn);
        } catch (err) {
            console.log(e);
            res.status(500).json({"error": "Internal Server Error"});
        }

    });


/***
 * generateUnsignedBridgeApprovalTxn(fromChain, fromCoin) =>
 * {unsigned_data: , otherInfo...} /v1/generate_unsigned_bridge_approval_txn?fromChain=1&fromCoin="USDC"...
 * Generates the unsigned txn data for approval transaction required for approving spend of a given coin
 ***/
router.get('/generate_unsigned_bridge_approval_txn',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenHashes())]),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChain and fromToken must be passed"});
            return;
        }

        try {
            const {fromChain, fromToken} = req.query
            const unsignedTxn = await generateUnsignedBridgeApprovalTxn(fromChain, fromToken);
            res.status(200).json(unsignedTxn);
        } catch (err) {
            res.status(500).json({"error": err.message});
        }
});

/***
 * generateBridgeTxnParams(fromChain, toChain, fromCoin, toCoin) =>
 * /v1/generate_bridge_txn_params?fromChain=1&toChain=56&fromCoin="USDC"...
 */
router.get('/generate_bridge_txn_params',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds())]),
    oneOf([check('toChain').isIn(getChainNames()), check('toChain').isIn(getChainNames())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenHashes())]),
    oneOf([check('toToken').isIn(getTokenSymbols()), check('toToken').isIn(getTokenHashes())]),
    query('amountFrom').isNumeric(),
    query('amountTo').isNumeric(),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChain, toChain, fromToken, toToken, amountFrom and amountTo must be passed"});
            return;
        }

        try {
            const {fromChain, toChain, fromToken, toToken, amountFrom, amountTo, addressTo} = req.query
            const params = await generateBridgeTxnParams(fromChain, toChain, fromToken, toToken, amountFrom, amountTo, addressTo)
            res.status(200).json(params);
        }  catch (err) {
            res.status(500).json({"error": err.message});
        }

});


export default router;
