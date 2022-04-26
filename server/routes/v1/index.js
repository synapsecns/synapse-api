import express from "express";
const router = express.Router();

import {query, validationResult} from "express-validator";
import {getBridgeableTokens} from "../../controllers/getBridgeableTokens.js"
import {getChainsForToken} from "../../controllers/getChainsForToken.js"
import {estimateBridgeOutputs} from "../../controllers/estimateBridgeOutputs.js"
import {generateUnsignedBridgeTxn} from "../../controllers/generateUnsignedBridgeTxn.js"
import {generateUnsignedBridgeApprovalTxn} from "../../controllers/generateUnsignedBridgeApprovalTxn.js"
import {checkBridgeTransactionStatus} from "../../controllers/checkBridgeTransactionStatus.js"
import {getStableSwapPools} from "../../controllers/getStableSwapPools.js"
import {estimateSwapOutput} from "../../controllers/estimateSwapOutput.js"
import {generateSwapTransaction} from "../../controllers/generateSwapTransaction.js"
import {getSwapTokenMap} from "../../controllers/getSwapTokenMap.js"
import {checkSwapSupported} from "../../controllers/checkSwapSupported.js"

import {chainParamValidator, tokenParamValidator, amountParamValidator} from "../../validators/queryParamValidators.js";


/**
 * @api {get} /v1/get_bridgeable_tokens Get Bridgeable Tokens
 * @apiName get_bridgeable_tokens
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} [chain] Optional chain id passed as a decimal or hex number.
 * If passed, bridgeable tokens for only this chain are returned else bridgeable tokens across all chains are returned.
 *
 * @apiExample {curl} Example usage:
 * curl --request GET 'https://syn-api-x.herokuapp.com/v1/get_bridgeable_tokens?chain=ARBITRUM'
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
    query("chain").custom(chainParamValidator),
    async (req, res) => {
        try {
            if (req.query.chain) {
                validationResult(req).throw();
            }
        } catch (err) {
            res.status(400).json({"error": "A valid value for chain must be passed"});
            return;
        }

        try {
            const {chain} = req.query;
            const tokenList = await getBridgeableTokens(chain)
            res.status(200).json(tokenList);
        } catch (err) {
            res.status(400).json({"error": err.toString()});
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
    query("token").custom(tokenParamValidator),
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
            res.status(400).json({"error": err.toString()});
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
 * @apiErrorExample {json} Error - Token Not Supported:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Error: Token BUSD not supported on 'from' network Avalanche C-Chain"
 *     }
 *
 * @apiSampleRequest /v1/estimate_bridge_output
 */
router.get('/estimate_bridge_output',
    query("fromChain").custom(chainParamValidator),
    query("toChain").custom(chainParamValidator),
    query("fromToken").custom(tokenParamValidator),
    query("toToken").custom(tokenParamValidator),
    query("amountFrom").custom(amountParamValidator),
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
            res.status(400).json({"error": err.toString()});
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
 * @apiQuery {String} addressTo Address that will receive the tokens
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/generate_unsigned_bridge_txn?fromChain=AVALANCHE&toChain=BSC&fromToken=USDC&toToken=USDC&amountFrom=10&addressTo=0x2D2c027E0d1A899a1965910Dd272bcaE1cD03c22'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "unsigned_data": "0x9f33072700000000000000...",
 *          "to": "0xE85429C97589AD793Ca11A8BC3477C03d27ED140",
 *          "gasPrice": "140000000000",
 *          "gasLimit": "140000000000"
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Valid arguments for fromChain, toChain, fromToken, toToken, amountFrom and addressTo must be passed"
 *     }
 *
 * @apiErrorExample {json} Error - Token Not Supported:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Error: Token BUSD not supported on 'from' network Avalanche C-Chain"
 *     }
 *
 * @apiSampleRequest /v1/generate_unsigned_bridge_txn
 */
router.get('/generate_unsigned_bridge_txn',
    query("fromChain").custom(chainParamValidator),
    query("toChain").custom(chainParamValidator),
    query("fromToken").custom(tokenParamValidator),
    query("toToken").custom(tokenParamValidator),
    query("amountFrom").custom(amountParamValidator),
    query("addressTo").isEthereumAddress(),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            // Breaking change
            if (!req.query.addressTo) {
                res.status(400).json({"error": "addressTo is now a required argument and must be an ethereum address"});
                return;
            }
            res.status(400).json({"error": "Valid arguments for fromChain, toChain, fromToken, toToken, amountFrom and addressTo must be passed"});
            return;
        }

        try {
            const {fromChain, toChain, fromToken, toToken, amountFrom, addressTo} = req.query
            const unsignedTxn = await generateUnsignedBridgeTxn(fromChain, toChain, fromToken, toToken, amountFrom, addressTo);
            res.status(200).json(unsignedTxn);
        } catch (err) {
            res.status(400).json({"error": err.toString()});
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
 *          "maxPriorityFeePerGas": "1500000000"
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
    query("fromChain").custom(chainParamValidator),
    query("fromToken").custom(tokenParamValidator),
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
            res.status(400).json({"error": err.toString()});
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
 *                 "decimals": {
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
    query("chain").custom(chainParamValidator),
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
            res.status(400).json({"error": err.toString()});
        }
    });

/**
 * @api {get} /v1/estimate_swap_output Estimate Swap Output
 * @apiName estimate_swap_output
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} chain Name or decimal/hex id of chain
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {String|Number} amountIn Input amount to swap
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/estimate_swap_output?chain=1&fromToken=USDC&toToken=DAI&amountIn=1'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "minAmountOut": "999971156015"
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "A valid value for chain, fromToken, toToken, amountIn must be passed"
 *     }
 *
 * @apiErrorExample {json} Error - Nonmatching Swap Types:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UnsupportedSwapError: Token swap types don't match"
 *     }
 *
 * @apiSampleRequest /v1/estimate_swap_output
 */
router.get('/estimate_swap_output',
    query("chain").custom(chainParamValidator),
    query("fromToken").custom(tokenParamValidator),
    query("toToken").custom(tokenParamValidator),
    query("amountIn").custom(amountParamValidator),
    async (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid value for chain, fromToken, toToken, amountIn must be passed"});
            return;
        }

        try {
            const {chain, fromToken, toToken, amountIn} = req.query
            const estSwapOutput = await estimateSwapOutput(chain, fromToken, toToken, amountIn);
            res.status(200).json(estSwapOutput);
        } catch (err) {
            res.status(400).json({"error": err.toString()});
        }
    });

/**
 * @api {get} /v1/generate_swap_transaction Generate Swap Transaction
 * @apiName generate_swap_transaction
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} chain Name or decimal/hex id of chain
 * @apiQuery {String} fromToken Token user will send to the bridge on the source chain
 * @apiQuery {String} toToken Token user will receive from the bridge on the destination chain
 * @apiQuery {String|Number} amountIn Input amount to swap
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/generate_swap_transaction?chain=0x38&fromToken=BUSD&toToken=USDC&amountIn=1'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "allowanceTarget": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
 *          "minAmountOut": "0",
 *          "data": "0x9169558600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062426173",
 *          "to": "0x28ec0B36F0819ecB5005cAB836F4ED5a2eCa4D13"
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "A valid value for chain, fromToken, toToken, amountIn must be passed"
 *     }
 *
 * @apiErrorExample {json} Error - Unsupported Swap:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UnsupportedSwapError: Token DAI not supported on network Binance Smart Chain"
 *     }
 *
 * @apiSampleRequest /v1/generate_swap_transaction
 */
router.get('/generate_swap_transaction',
    query("chain").custom(chainParamValidator),
    query("fromToken").custom(tokenParamValidator),
    query("toToken").custom(tokenParamValidator),
    query("amountIn").custom(amountParamValidator),
    async (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid value for chain, fromToken, toToken, amountIn must be passed"});
            return;
        }

        try {
            const {chain, fromToken, toToken, amountIn} = req.query
            const swapTxn = await generateSwapTransaction(chain, fromToken, toToken, amountIn);
            res.status(200).json(swapTxn);
        } catch (err) {
            res.status(400).json({"error": err.toString()});
        }
    });

/**
 * @api {get} /v1/check_bridge_transaction_status Check Bridge Transaction Status
 * @apiName check_bridge_transaction_status
 * @apiGroup API Endpoints
 *
 * @apiQuery {String} toChain Destination chain for the transaction
 * @apiQuery {String} fromChainTxnHash Token Transaction hash from the source chain
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/check_bridge_transaction_status?toChain=43114&fromChainTxnHash=0x97a0132993a148ed7b2c3a8e8d651f28e41cf7245c6fd728158b1262a376cb1b'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "isComplete": true,
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "A valid value for toChain and fromChainTxnHash must be passed"
 *     }
 *
 * @apiSampleRequest /v1/check_bridge_transaction_status
 */
router.get('/check_bridge_transaction_status',
    query("toChain").custom(chainParamValidator),
    query("fromChainTxnHash").isString(),
    async (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid value for toChain and fromChainTxnHash must be passed"});
            return;
        }

        try {
            const {toChain, fromChainTxnHash} = req.query
            const status = await checkBridgeTransactionStatus(toChain, fromChainTxnHash);
            res.status(200).json(status);
        } catch (err) {
            res.status(400).json({"error": err.toString()});
        }
    });

/**
 * @api {get} /v1/get_network_swappable_tokens Get Swappable Tokens for Network
 * @apiName get_network_swappable_tokens
 * @apiGroup API Endpoints
 *
 * @apiQuery {String} chainFrom To get a map of all swappable tokens for this chain to all chains
 * @apiQuery {String} [chainTo] Optional, if specified returns swappable tokens only between chainFrom and chainTo
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/get_network_swappable_tokens?chainFrom=1&chainTo=43114'
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *        {
 *             "addresses": {
 *                 "1": "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",
 *                 "10": "0x0b5740c6b4a97f90eF2F0220651Cca420B868FfB",
 *                 ...
 *             },
 *             "wrapperAddresses": {},
 *             "name": "Olympus DAO",
 *             "symbol": "gOHM",
 *             "swapType": "OHM",
 *             "isETH": false,
 *             "isGasToken": false,
 *             "decimals": {
 *                 "1": 18,
 *                 "10": 18,
 *                 ...
 *             }
 *         },
 *         {
 *             "addresses": {
 *                 "1": "0x1B84765dE8B7566e4cEAF4D0fD3c5aF52D3DdE4F",
 *                 "25": "0x396c9c192dd323995346632581BEF92a31AC623b",
 *                 ...
 *             },
 *             "wrapperAddresses": {},
 *             "name": "Synapse nUSD",
 *             "symbol": "nUSD",
 *             "swapType": "USD",
 *             "isETH": false,
 *             "isGasToken": false,
 *             "decimals": {
 *                 "1": 18,
 *                 "25": 18,
 *                 ...
 *             }
 *         },
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "A valid value for chainFrom and optionally chainTo must be passed"
 *     }
 *
 * @apiSampleRequest /v1/get_network_swappable_tokens
 */
router.get('/get_network_swappable_tokens',
    query("fromChain").custom(chainParamValidator),
    query("toChain").if(query("toChain").exists()).custom(chainParamValidator),
    async (req, res) => {
        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "A valid value for fromChain and optionally toChain must be passed"});
            return;
        }

        try {
            const {fromChain, toChain} = req.query
            const status = await getSwapTokenMap(fromChain, toChain);
            res.status(200).json(status);
        } catch (err) {
            res.status(400).json({"error": err.toString()});
        }
    });

/**
 * @api {get} /v1/check_swap_supported Check Swap Supported
 * @apiName check_swap_supported
 * @apiGroup API Endpoints
 *
 * @apiQuery {Number|String} fromChain Name or decimal/hex id of chain to swap from
 * @apiQuery {Number|String} toChain Name or decimal/hex id of chain to swap to
 * @apiQuery {String} fromToken Token desired to swap from source chain
 * @apiQuery {String} toToken Token desired to receive on destination chain
 *
 * @apiExample {curl} Example usage:
 *      curl --request GET 'https://syn-api-x.herokuapp.com/v1/check_swap_supported?fromChain=1&toChain=BSC&fromToken=USDC&toToken=GOHM'
 *
 * @apiSuccessExample Success-Response (Unsupported):
 *      HTTP/1.1 200 OK
 *      {
 *          "supported": false,
 *          "reason": "Token swap types don't match"
 *      }
 *
 * @apiSuccessExample Success-Response (Supported):
 *      HTTP/1.1 200 OK
 *      {
 *          "supported": true
 *      }
 *
 * @apiErrorExample {json} Error - Invalid Arguments:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Valid arguments for fromChain, toChain, fromToken and toToken must be passed"
 *     }
 *
 * @apiSampleRequest /v1/check_swap_supported
 */
router.get('/check_swap_supported',
    query("fromChain").custom(chainParamValidator),
    query("toChain").custom(chainParamValidator),
    query("fromToken").custom(tokenParamValidator),
    query("toToken").custom(tokenParamValidator),
    async (req, res) => {

        try {
            validationResult(req).throw();
        } catch (err) {
            res.status(400).json({"error": "Valid arguments for fromChain, toChain, fromToken, toToken, amountFrom and amountTo must be passed"});
            return;
        }

        try {
            const {fromChain, toChain, fromToken, toToken} = req.query
            const params = await checkSwapSupported(fromChain, toChain, fromToken, toToken)
            res.status(200).json(params);
        }  catch (err) {
            res.status(400).json({"error": err.toString()});
        }

    });


export default router;
