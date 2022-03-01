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
    getHexChainIds,
    getChainNames,
    getTokenHashes,
    getTokenSymbolFromParam,
    getTokenSymbols
} from "../../core/utils.js"
import {BigNumber} from "ethers";


/**
 * @api {get} /v1/get_bridgable_tokens Get Bridgeable Tokens
 * @apiName get_bridgable_tokens
 * @apiGroup API
 *
 * @apiParam {Number|String} chain Chain id passed as a decimal or hex number (56, 0x38 etc.) or name (ETH, BSC, etc.)
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
 */
router.get('/get_bridgable_tokens',
    oneOf([
        check('chain').isIn(getChainNames()),
        check('chain').isIn(getChainIds()),
        check('chain').isIn(getHexChainIds())]
    ),
    async (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid value for chain must be passed"});
            return;
        }

        try {
            const chainId = getChainIdFromParam(req.query.chain)
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
 * @apiParam {Number} token Token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
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

/**
 * @api {get} /v1/estimate_bridge_output Estimate Bridge Output
 * @apiName estimate_bridge_output
 * @apiGroup API
 *
 * @apiParam {Number|String} fromChain Name or decimal/hex id of chain the transaction is from
 * @apiParam {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiParam {String} fromToken Token user will send to the bridge on the source chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiParam {String} toToken Token user will receive from the bridge on the destination chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiParam {String} input Transaction input amount
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 * {
 *     "amountToReceive": "0",
 *     "bridgeFee": "2000000000000000000"
 * }
 */
router.get('/estimate_bridge_output',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds()), check('fromChain').isIn(getHexChainIds())]),
    oneOf([check('toChain').isIn(getChainNames()), check('toChain').isIn(getChainIds()), check('toChain').isIn(getHexChainIds())]),
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

/**
 * @api {get} /v1/generate_unsigned_bridge_txn Generate Unsigned Bridge Transaction
 * @apiName generate_unsigned_bridge_txn
 * @apiGroup API
 *
 * @apiParam {Number|String} fromChain Name or decimal/hex id of chain transaction is from
 * @apiParam {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiParam {String} fromToken Token user will send to the bridge on the source chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiParam {String} toToken Token user will receive from the bridge on the destination chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
 * @apiParam {Number} amountFrom Amount of tokenFrom (denoted in wei) that the user will send to the bridge on the source chain
 * @apiParam {String} address Optional, user can provide an address other than the one retrieved from signer to receive tokens
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 * {
 *     "unsigned_data": "0x9f33072700000000000000...",
 *     "to": "0xE85429C97589AD793Ca11A8BC3477C03d27ED140",
 *     "gasPrice": "150000000000",
 *     "gasLimit": "150000000000"
 * }
 */
router.get('/generate_unsigned_bridge_txn',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds()), check('fromChain').isIn(getHexChainIds())]),
    oneOf([check('toChain').isIn(getChainNames()), check('toChain').isIn(getChainIds()), check('toChain').isIn(getHexChainIds())]),
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

/**
 * @api {get} /v1/generate_unsigned_bridge_approval_txn Generate Unsigned Bridge Approval Transaction
 * @apiName generate_unsigned_bridge_approval_txn
 * @apiGroup API
 *
 * @apiParam {Number|String} fromChain Name or decimal/hex id of chain
 * @apiParam {String} fromToken Token instance or valid on-chain address of the token the user will be sending to the bridge on the source chain. Can be token address on chain (eg. 0xe9e7cea3dedca5984780bafc599bd69add087d56) or Token Symbol (eg. DAI)
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
 */
router.get('/generate_unsigned_bridge_approval_txn',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds()), check('fromChain').isIn(getHexChainIds())]),
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

/**
 * @api {get} /v1/generate_bridge_txn_params Generate Bridge Transaction Parameters
 * @apiName generate_bridge_txn_params
 * @apiGroup API
 *
 * @apiParam {Number|String} fromChain Name or decimal/hex id of chain transaction is from
 * @apiParam {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiParam {String} fromToken Token user will send to the bridge on the source chain
 * @apiParam {String} toToken Token user will receive from the bridge on the destination chain
 * @apiParam {Number} amountFrom Amount of tokenFrom (denoted in wei) that the user will send to the bridge on the source chain
 * @apiParam {String} address Optional, user can provide an address other than the one retrieved from signer to receive tokens
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
 */
router.get('/generate_bridge_txn_params',
    oneOf([check('fromChain').isIn(getChainNames()), check('fromChain').isIn(getChainIds()), check('fromChain').isIn(getHexChainIds())]),
    oneOf([check('toChain').isIn(getChainNames()), check('toChain').isIn(getChainIds()), check('toChain').isIn(getHexChainIds())]),
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
