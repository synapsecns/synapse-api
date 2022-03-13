import express from "express";
const router = express.Router();

import {check, oneOf,query, validationResult} from "express-validator";
import {getBridgeableTokensForChain} from "../../controllers/getBridgeableTokens.js"
import {getChainsForToken} from "../../controllers/getChainsForToken.js"
import {estimateBridgeOutputs} from "../../controllers/estimateBridgeOutputs.js"
import {generateUnsignedBridgeTxn} from "../../controllers/generateUnsignedBridgeTxn.js"
import {generateUnsignedBridgeApprovalTxn} from "../../controllers/generateUnsignedBridgeApprovalTxn.js"
import {generateBridgeTxnParams} from "../../controllers/generateBridgeTxnParams.js"

import * as ChainUtils from "../../utils/ChainUtils.js";

import {
    getTokenAddresses,
    getTokenSymbolFromQueryParam,
    getTokenSymbols
} from "../../core/utils.js"
import {BigNumber} from "ethers";


/**
 * @api {get} /v1/get_bridgable_tokens Get Bridgeable Tokens
 * @apiName get_bridgable_tokens
 * @apiGroup API
 *
 * @apiQuery {Number|String} chain Chain id passed as a decimal or hex number (56, 0x38 etc.) or name (ETH, BSC, etc.)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "name": "Binance USD",
 *         "symbol": "BUSD",
 *         "decimals": 18,
 *         "addresses": {
 *             "56": "0xe9e7cea3dedca5984780bafc599bd69add087d56"
 *         },
 *         "swapType": "USD"
 *     }
 *     ...
 * ]
 *
 * @apiSampleRequest /v1/get_bridgable_tokens
 */
router.get('/get_bridgable_tokens',
    oneOf([
        check('chain').isIn(ChainUtils.getNames()),
        check('chain').isIn(ChainUtils.getIds()),
        check('chain').isIn(ChainUtils.getHexIds())]
    ),
    async (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid value for chain must be passed"});
            return;
        }

        try {
            const chainId = ChainUtils.getIdFromRequestQueryParam(req.query.chain)
            const tokenList = await getBridgeableTokensForChain(chainId)
            res.status(200).json(tokenList);
        } catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }
    });


/**
 * @api {get} /v1/get_chains_for_token Get Chains for Token
 * @apiName get_chains_for_token
 * @apiGroup API
 *
 * @apiQuery {String} token Token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *         "name": "Ethereum Mainnet",
 *         "chainId": 1,
 *         "chainCurrency": "ETH"
 *     },
 *     ...
 * ]
 *
 * @apiSampleRequest /v1/get_chains_for_token
 */
router.get('/get_chains_for_token',
    oneOf([check('token').isIn(getTokenSymbols()), check('token').isIn(getTokenAddresses())]),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid token must be passed"});
            return;
        }

        try {
            const tokenSymbol = getTokenSymbolFromQueryParam(req.query.token)
            const tokenList = await getChainsForToken(tokenSymbol)
            res.status(200).json(tokenList);
        }  catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }

    });

/**
 * @api {get} /v1/estimate_bridge_output Estimate Bridge Output
 * @apiName estimate_bridge_output
 * @apiGroup API
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain the transaction is from
 * @apiQuery {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiQuery {String} amountFrom Transaction input amount
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 * {
 *     "amountToReceive": "0",
 *     "bridgeFee": "2000000000000000000"
 * }
 *
 * @apiSampleRequest /v1/estimate_bridge_output
 */
router.get('/estimate_bridge_output',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('toChain').isIn(ChainUtils.getNames()), check('toChain').isIn(ChainUtils.getIds()), check('toChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenAddresses())]),
    oneOf([check('toToken').isIn(getTokenSymbols()), check('toToken').isIn(getTokenAddresses())]),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChain, toChain, fromToken, toToken and amountFrom must be passed"});
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

/**
 * @api {get} /v1/generate_unsigned_bridge_txn Generate Unsigned Bridge Transaction
 * @apiName generate_unsigned_bridge_txn
 * @apiGroup API
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain transaction is from
 * @apiQuery {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiQuery {Number} amountFrom Amount of tokenFrom (denoted in wei) that the user will send to the bridge on the source chain
 * @apiQuery {String} address Optional, user can provide an address other than the one retrieved from signer to receive tokens
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 * {
 *     "unsigned_data": "0x9f33072700000000000000...",
 *     "to": "0xE85429C97589AD793Ca11A8BC3477C03d27ED140",
 *     "gasPrice": "150000000000",
 *     "gasLimit": "150000000000"
 * }
 *
 * @apiSampleRequest /v1/generate_unsigned_bridge_txn
 */
router.get('/generate_unsigned_bridge_txn',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('toChain').isIn(ChainUtils.getNames()), check('toChain').isIn(ChainUtils.getIds()), check('toChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenAddresses())]),
    oneOf([check('toToken').isIn(getTokenSymbols()), check('toToken').isIn(getTokenAddresses())]),
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
            console.error(err);
            res.status(500).json({"error": "Internal Server Error"});
        }

    });

/**
 * @api {get} /v1/generate_unsigned_bridge_approval_txn Generate Unsigned Bridge Approval Transaction
 * @apiName generate_unsigned_bridge_approval_txn
 * @apiGroup API
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain
 * @apiQuery {String} fromToken Token instance or valid on-chain address of the token the user will be sending to the bridge on the source chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 * {
 *     "unsigned_data": "0x095ea7b3000000000000000000000000...",
 *     "to": "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
 *     "maxPriorityFeePerGas": {
 *         "type": "BigNumber",
 *         "hex": "0x59682f00"
 *     }
 * }
 *
 * @apiSampleRequest /v1/generate_unsigned_bridge_approval_txn
 */
router.get('/generate_unsigned_bridge_approval_txn',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenAddresses())]),
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

/**
 * @api {get} /v1/generate_bridge_txn_params Generate Bridge Transaction Parameters
 * @apiName generate_bridge_txn_params
 * @apiGroup API
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain transaction is from
 * @apiQuery {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {Number} amountFrom Amount of tokenFrom (denoted in wei) that the user will send to the bridge on the source chain
 * @apiQuery {String} address Optional, user can provide an address other than the one retrieved from signer to receive tokens
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 * {
 *     "tokenFrom": {
 *         "name": "USD Circle",
 *         "symbol": "USDC",
 *         "addresses": {
 *             "1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
 *             ...
 *         },
 *         "swapType": "USD",
 *         "isETH": false,
 *         "wrapperAddresses": {},
 *         "_decimals": {
 *             "1": 6,
 *             ...
 *         }
 *     },
 *     "tokenTo": {
 *         "name": "USD Circle",
 *         "symbol": "USDC",
 *         "addresses": {
 *             "1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
 *             ...
 *         },
 *         "swapType": "USD",
 *         "isETH": false,
 *         "wrapperAddresses": {},
 *         "_decimals": {
 *             "1": 6,
 *             ...
 *         }
 *     },
 *     "chainIdTo": 56,
 *     "amountFrom": {
 *         "type": "BigNumber",
 *         "hex": "0x01"
 *     },
 *     "amountTo": {
 *         "type": "BigNumber",
 *         "hex": "0x01"
 *     }
 * }
 *
 * @apiSampleRequest /v1/generate_bridge_txn_params
 */
router.get('/generate_bridge_txn_params',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('toChain').isIn(ChainUtils.getNames()), check('toChain').isIn(ChainUtils.getIds()), check('toChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(getTokenSymbols()), check('fromToken').isIn(getTokenAddresses())]),
    oneOf([check('toToken').isIn(getTokenSymbols()), check('toToken').isIn(getTokenAddresses())]),
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
