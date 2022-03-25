import express from "express";
const router = express.Router();

import {check, oneOf,query, validationResult} from "express-validator";
import {getBridgeableTokensForChain} from "../../controllers/getBridgeableTokens.js"
import {getChainsForToken} from "../../controllers/getChainsForToken.js"
import {estimateBridgeOutputs} from "../../controllers/estimateBridgeOutputs.js"
import {generateUnsignedBridgeTxn} from "../../controllers/generateUnsignedBridgeTxn.js"
import {generateUnsignedBridgeApprovalTxn} from "../../controllers/generateUnsignedBridgeApprovalTxn.js"
import {generateBridgeTxnParams} from "../../controllers/generateBridgeTxnParams.js"

import {getStableSwapPools} from "../../controllers/getStableSwapPools.js"
import {estimateSwapOutput} from "../../controllers/estimateSwapOutput.js"
import {generateSwapTransaction} from "../../controllers/generateSwapTransaction.js"

import * as ChainUtils from "../../utils/chainUtils.js";
import * as TokenUtils from "../../utils/tokenUtils.js";

import {BigNumber} from "ethers";


/**
 * @api {get} /v1/get_bridgeable_tokens Get Bridgeable Tokens
 * @apiName get_bridgeable_tokens
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} chain Chain id passed as a decimal or hex number
 *
 * @apiExample {curl} Example usage:
 * curl --request GET 'https://syn-api-x.herokuapp.com/v1/get_bridgable_tokens?chain=ARBITRUM'
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "name": "Binance USD",
 *             "symbol": "BUSD",
 *             "decimals": 18,
 *             "addresses": {
 *                 "56": "0xe9e7cea3dedca5984780bafc599bd69add087d56"
 *             },
 *             "swapType": "USD"
 *         }
 *         ...
 *     ]
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "A valid value for chain must be passed"
 *     }
 *
 * @apiSampleRequest /v1/get_bridgeable_tokens
 */
router.get('/get_bridgeable_tokens',
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
            const {chain} = req.query;
            const tokenList = await getBridgeableTokensForChain(chain)
            res.status(200).json(tokenList);
        } catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }
    });


/**
 * @api {get} /v1/get_chains_for_token Get Chains for Token
 * @apiName get_chains_for_token
 * @apiGroup API Endpoints
 *
 * @apiQuery {String} token Token symbol or chain address
 *
 * @apiExample {curl} Example usage:
 * curl --request GET 'https://syn-api-x.herokuapp.com/v1/get_chains_for_token?token=DAI'
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "name": "Ethereum Mainnet",
 *             "chainId": 1,
 *             "chainCurrency": "ETH"
 *         },
 *         ...
 *     ]
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "A valid token must be passed"
 *     }
 *
 * @apiSampleRequest /v1/get_chains_for_token
 */
router.get('/get_chains_for_token',
    oneOf([check('token').isIn(TokenUtils.getSymbols()), check('token').isIn(TokenUtils.getAddresses())]),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid token must be passed"});
            return;
        }

        try {
            const {token} = req.query;
            const tokenList = await getChainsForToken(token);
            res.status(200).json(tokenList);
        }  catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }

    });

/**
 * @api {get} /v1/estimate_bridge_output Estimate Bridge Output
 * @apiName estimate_bridge_output
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain the transaction is from
 * @apiQuery {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {String} amountFrom Transaction input amount
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'http://syn-api-x.herokuapp.com/v1/estimate_bridge_output?fromChain=AVALANCHE&toChain=BSC&fromToken=USDC&toToken=USDC&amountFrom=10'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "amountToReceive": "0",
 *          "bridgeFee": "2000000000000000000"
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Valid arguments for fromChain, toChain, fromToken, toToken and amountFrom must be passed"
 *     }
 *
 * @apiSampleRequest /v1/estimate_bridge_output
 */
router.get('/estimate_bridge_output',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('toChain').isIn(ChainUtils.getNames()), check('toChain').isIn(ChainUtils.getIds()), check('toChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(TokenUtils.getSymbols()), check('fromToken').isIn(TokenUtils.getAddresses())]),
    oneOf([check('toToken').isIn(TokenUtils.getSymbols()), check('toToken').isIn(TokenUtils.getAddresses())]),
    check('amountFrom').isNumeric(),
    async (req, res) => {

        try {
            validationResult(req).throw();
            BigNumber.from(req.query.amountFrom);
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChain, toChain, fromToken, toToken and amountFrom must be passed"});
            return;
        }

        try {
            const {fromChain, toChain, fromToken, toToken, amountFrom} = req.query
            const estimate = await estimateBridgeOutputs(fromChain, toChain, fromToken, toToken, amountFrom);
            res.status(200).json(estimate);
        } catch (err) {

            if (err.message.includes("not supported on")) {
                res.status(400).json({"error": `${err.message}`});
            } else {
                res.status(500).json({"error": "Internal Server Error"});
            }
        }
    });

/**
 * @api {get} /v1/generate_unsigned_bridge_txn Generate Unsigned Bridge Transaction
 * @apiName generate_unsigned_bridge_txn
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain transaction is from
 * @apiQuery {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {Number} amountFrom Amount that the user will send to the bridge on the source chain
 * @apiQuery {String} [address] Optional, user can provide an address other than the one retrieved from signer to receive tokens
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/generate_unsigned_bridge_txn?fromChain=AVALANCHE&toChain=BSC&fromToken=USDC&toToken=USDC&amountFrom=10&address=0x2D2c027E0d1A899a1965910Dd272bcaE1cD03c22'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "unsigned_data": "0x9f33072700000000000000...",
 *          "to": "0xE85429C97589AD793Ca11A8BC3477C03d27ED140",
 *          "gasPrice": "150000000000",
 *          "gasLimit": "150000000000"
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Valid arguments for fromChain, toChain, fromToken, toToken, amountFrom and address must be passed"
 *     }
 *
 * @apiSampleRequest /v1/generate_unsigned_bridge_txn
 */
router.get('/generate_unsigned_bridge_txn',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('toChain').isIn(ChainUtils.getNames()), check('toChain').isIn(ChainUtils.getIds()), check('toChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(TokenUtils.getSymbols()), check('fromToken').isIn(TokenUtils.getAddresses())]),
    oneOf([check('toToken').isIn(TokenUtils.getSymbols()), check('toToken').isIn(TokenUtils.getAddresses())]),
    check('amountFrom').exists(),
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
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain
 * @apiQuery {String} fromToken Token instance or valid on-chain address of the token the user will be sending to the bridge on the source chain
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/generate_unsigned_bridge_approval_txn?fromChain=ETH&fromToken=ETH'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "unsigned_data": "0x095ea7b3000000000000000000000000...",
 *          "to": "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
 *          "maxPriorityFeePerGas": {
 *              "type": "BigNumber",
 *              "hex": "0x59682f00"
 *          }
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Valid arguments for fromChain and fromToken must be passed"
 *     }
 *
 * @apiSampleRequest /v1/generate_unsigned_bridge_approval_txn
 */
router.get('/generate_unsigned_bridge_approval_txn',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(TokenUtils.getSymbols()), check('fromToken').isIn(TokenUtils.getAddresses())]),
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
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain transaction is from
 * @apiQuery {Number|String} toChain Name or decimal/hex id of chain transaction is to
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {Number} amountFrom Amount of tokenFrom (denoted in wei) that the user will send to the bridge on the source chain
 * @apiQuery {String} [address] Optional, user can provide an address other than the one retrieved from signer to receive tokens
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/generate_bridge_txn_params?fromChain=1&toChain=BSC&fromToken=USDC&toToken=USDC&amountFrom=1&amountTo=1'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "tokenFrom": {
 *              "name": "USD Circle",
 *              "symbol": "USDC",
 *              "addresses": {
 *                  "1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
 *                  ...
 *              },
 *              "swapType": "USD",
 *              "isETH": false,
 *              "wrapperAddresses": {},
 *              "_decimals": {
 *                  "1": 6,
 *                  ...
 *              }
 *          },
 *          "tokenTo": {
 *              "name": "USD Circle",
 *              "symbol": "USDC",
 *              "addresses": {
 *                  "1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
 *                  ...
 *              },
 *              "swapType": "USD",
 *              "isETH": false,
 *              "wrapperAddresses": {},
 *              "_decimals": {
 *                  "1": 6,
 *                  ...
 *              }
 *          },
 *          "chainIdTo": 56,
 *          "amountFrom": {
 *              "type": "BigNumber",
 *              "hex": "0x01"
 *          },
 *          "amountTo": {
 *              "type": "BigNumber",
 *              "hex": "0x01"
 *          }
 * }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Valid arguments for fromChain, toChain, fromToken, toToken, amountFrom and amountTo must be passed"
 *     }
 *
 * @apiSampleRequest /v1/generate_bridge_txn_params
 */
router.get('/generate_bridge_txn_params',
    oneOf([check('fromChain').isIn(ChainUtils.getNames()), check('fromChain').isIn(ChainUtils.getIds()), check('fromChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('toChain').isIn(ChainUtils.getNames()), check('toChain').isIn(ChainUtils.getIds()), check('toChain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(TokenUtils.getSymbols()), check('fromToken').isIn(TokenUtils.getAddresses())]),
    oneOf([check('toToken').isIn(TokenUtils.getSymbols()), check('toToken').isIn(TokenUtils.getAddresses())]),
    query('amountFrom').exists(),
    query('amountTo').exists(),
    async (req, res) => {

        try {
            validationResult(req).throw();
            BigNumber.from(req.query.amountFrom);
            BigNumber.from(req.query.amountTo);
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

/**
 * @api {get} /v1/get_stableswap_pools Get StableSwap Pools
 * @apiName get_stableswap_pools
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} chain Name or decimal/hex id of chain
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/generate_bridge_txn_params?fromChain=1&toChain=BSC&fromToken=USDC&toToken=USDC&amountFrom=1&amountTo=1'
 *
 * @apiSuccessExample Success-Response:
 *     {
 *         "nUSD": {
 *             "baseToken": {
 *                 "name": "Synapse nUSD LP Token Ethereum",
 *                 "symbol": "nUSD",
 *                 "addresses": {
 *                     "1": "0x1B84765dE8B7566e4cEAF4D0fD3c5aF52D3DdE4F"
 *                 },
 *                 "swapType": "USD",
 *                 "isETH": false,
 *                 "wrapperAddresses": {},
 *                 "_decimals": {
 *                     "1": 18
 *                 }
 *             },
 *             "poolId": 420,
 *             "poolName": "Ethereum Stableswap Pool ",
 *             "poolType": "USD",
 *             "poolTokens": [
 *                 {
 *                     "name": "Dai",
 *                     "symbol": "DAI",
 *                     "addresses": {
 *                         "1": "0x6b175474e89094c44da98b954eedeac495271d0f",
 *                         "56": "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
 *                         ...
 *                      }
 *                  },
 *                  ...
 *             ]
 *         },
 *         "nETH": {
 *             ...
 *         }
 *     }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Valid arguments for chain must be passed"
 *     }
 *
 * @apiSampleRequest /v1/get_stableswap_pools
 */
router.get('/get_stableswap_pools',
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
            const {chain} = req.query
            const swappableTokens = await getStableSwapPools(chain);
            res.status(200).json(swappableTokens);
        } catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }
    });

/**
 * @api {get} /v1/estimate_swap_output Estimate Swap Output
 * @apiName estimate_swap_output
 * @apiGroup API Endpoints

 * @apiQuery {Number|String} chain Name or decimal/hex id of chain
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {String|Number} amountIn Input amount to swap
 *
 * @apiSampleRequest /v1/estimate_swap_output
 */
router.get('/estimate_swap_output',
    oneOf([check('chain').isIn(ChainUtils.getNames()), check('chain').isIn(ChainUtils.getIds()), check('chain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(TokenUtils.getSymbols()), check('fromToken').isIn(TokenUtils.getAddresses())]),
    oneOf([check('toToken').isIn(TokenUtils.getSymbols()), check('toToken').isIn(TokenUtils.getAddresses())]),
    query('amountIn').isNumeric(),
    async (req, res) => {
        try {
            validationResult(req).throw();
            BigNumber.from(req.query.amountIn);

        } catch (err) {
            res.status(400).json({"error": "A valid value for chain, fromToken, toToken, amountIn must be passed"});
            return;
        }

        try {
            const {chain, fromToken, toToken, amountIn} = req.query
            const estSwapOutput = await estimateSwapOutput(chain, fromToken, toToken, amountIn);
            res.status(200).json(estSwapOutput);
        } catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }
    });

/**
 * @api {get} /v1/generate_swap_transaction Generate Swap Transaction
 * @apiName generate_swap_transaction
 * @apiGroup API Endpoints

 * @apiQuery {Number|String} chain Name or decimal/hex id of chain
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {String|Number} amountIn Input amount to swap
 *
 * @apiSampleRequest /v1/generate_swap_transaction
 */
router.get('/generate_swap_transaction',
    oneOf([check('chain').isIn(ChainUtils.getNames()), check('chain').isIn(ChainUtils.getIds()), check('chain').isIn(ChainUtils.getHexIds())]),
    oneOf([check('fromToken').isIn(TokenUtils.getSymbols()), check('fromToken').isIn(TokenUtils.getAddresses())]),
    oneOf([check('toToken').isIn(TokenUtils.getSymbols()), check('toToken').isIn(TokenUtils.getAddresses())]),
    query('amountIn').exists(),
    async (req, res) => {
        try {
            validationResult(req).throw();
            BigNumber.from(req.query.amountIn);

        } catch (err) {
            res.status(400).json({"error": "A valid value for chain, fromToken, toToken, amountIn must be passed"});
            return;
        }

        try {
            const {chain, fromToken, toToken, amountIn} = req.query
            const swapTxn = await generateSwapTransaction(chain, fromToken, toToken, amountIn);
            res.status(200).json(swapTxn);
        } catch (err) {
            console.log(err);
            res.status(500).json({"error": "Internal Server Error"});
        }
    });

export default router;
