import {BaseToken, SwapPools, Tokens} from "@synapseprotocol/sdk"
import * as Cache from "./cache.js"
import {getIds} from "./chainUtils.js";
import equal from "deep-equal"

/**
 * NOTE: Symbols is a bit misleading. We refer to symbol as a key keys of the `Tokens` object
 * This is because, Wrapped ETH has the symbol WETH for multiple chains, but different keys
 * The key to Token object is the unique attribute while identifying a token and NOT BaseToken.symbol
 *
 * The _buildObjectFromSDKObject takes care of this by replacing BaseToken.symbol by the unique key instead
 */

/**
 * Returns list of token symbols
 * @returns {String[]}
 */
function getSymbols() {
    let cachedRes = Cache.get(getSymbols);
    if (cachedRes) {
        return cachedRes;
    }

    let tokenSymbols = [];
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            tokenSymbols.push(key);
        }
    })

    return Cache.set(getSymbols, tokenSymbols);
}

/**
 * Returns list of token addresses across all chains
 * @returns {String[]}
 */
function getAddresses() {
    let cachedRes = Cache.get(getAddresses);
    if (cachedRes) {
        return cachedRes;
    }

    let tokenAddresses = [];
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            const token = Tokens[key];
            Object.keys(token.addresses).forEach(key => {
                tokenAddresses.push(token.addresses[key]);
            })
        }
    })

    return Cache.set(getAddresses, tokenAddresses);
}

/**
 * Builds an object for display from an instance of the SDKs Token
 *
 * @param {BaseToken} sdkToken
 * @param uniqueSymbol
 * @returns {{symbol, addresses: *, isETH: *, wrapperAddresses: *, decimals: *, name, swapType: *}}
 * @private
 */
function _buildObjectFromSDKObject(sdkToken, uniqueSymbol) {
    return {
        name: sdkToken.name,
        symbol: uniqueSymbol,
        decimals: sdkToken._decimals,
        addresses: sdkToken.addresses,
        swapType: sdkToken.swapType,
        isETH: sdkToken.isETH,
        wrapperAddresses: sdkToken.wrapperAddresses
    };
}

/**
 * @returns {Object[]}
 */
function getObjects() {
    let cachedRes = Cache.get(getObjects);
    if (cachedRes) {
        return cachedRes;
    }

    let tokenObjList = [];
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            let tokenObj = _buildObjectFromSDKObject(Tokens[key], key);
            tokenObjList.push(tokenObj);
        }
    })

    return Cache.set(getObjects, tokenObjList);
}

/**
 * NOTE: Refer to JSDoc about symbols at the top
 *
 * @param {String} symbol
 * @returns {Object}
 */
function getObjectFromSymbol(symbol) {
    let cachedRes = Cache.get(getObjectFromSymbol, [symbol]);
    if (cachedRes) {
        return cachedRes;
    }

    let tokenObj = null;
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            if (key === symbol) {
                tokenObj = _buildObjectFromSDKObject(Tokens[key], key);
            }
        }
    })

    return Cache.set(getObjectFromSymbol, tokenObj, [symbol]);
}

/**
 * Takes in the SDKs BaseToken object and returns a representative version of the Object for display
 *
 * @param {Object} baseObj
 * @returns {Object}
 */
function getJSONFromBaseObject(baseObj) {
    let cachedRes = Cache.get(getJSONFromBaseObject, [JSON.stringify(baseObj)]);
    if (cachedRes) {
        return cachedRes;
    }

    let resObj = null;
    for (let key of Object.keys(Tokens)) {
        if (equal(Tokens[key], baseObj)) {
            resObj = _buildObjectFromSDKObject(Tokens[key], key);
            break;
        }
    }

    return Cache.set(getJSONFromBaseObject, resObj, [JSON.stringify(baseObj)]);
}

/**
 * @param {String} symbol
 * @param {String} chainId
 * @returns {String|null}
 */
function getChainAddressFromSymbol(symbol, chainId) {
    let cachedRes = Cache.get(getChainAddressFromSymbol, [symbol, chainId]);
    if (cachedRes) {
        return cachedRes;
    }

    let address =  Tokens[symbol].addresses[chainId];
    address = address ? address : null;

    return Cache.set(getChainAddressFromSymbol, address, [symbol, chainId]);
}

/**
 * Returns a key to the `Tokens` object of the SDK
 *
 * @param {String} tokenParam
 * @returns {Object}
 */
function getSymbolFromRequestQueryParam(tokenParam) {
    // getSymbols() effectively returns keys. Check function doc
    if (getSymbols().includes(tokenParam)) {
        // tokenParam is already a key. Just return
        return tokenParam;
    }

    // Has to be in addresses, as verified by validator
    // TODO: Move to new function, `getTokenKeyFromAddress`
    for (let key of Object.keys(Tokens)) {
        if (Tokens[key] instanceof BaseToken) {
            if (Object.values(Tokens[key].addresses).includes(tokenParam)) {
                return key;
            }
        }
    }
}

/**
 * @returns {Object[]}
 */
function getAllBridgeableTokens() {
    let cachedRes = Cache.get(getAllBridgeableTokens);
    if (cachedRes) {
        return cachedRes;
    }

    let chainIds = getIds();
    let resTokenSet = new Set();
    chainIds.forEach((chainId) => {
        let tokenList = SwapPools.getAllSwappableTokensForNetwork(parseInt(chainId));
        tokenList.forEach(tokenObj => {
            resTokenSet.add(getJSONFromBaseObject(tokenObj))
        })
    })

    return Cache.set(getAllBridgeableTokens, Array.from(resTokenSet));
}

export {
    getSymbols,
    getAddresses,
    getObjects,
    getObjectFromSymbol,
    getChainAddressFromSymbol,
    getSymbolFromRequestQueryParam,
    getAllBridgeableTokens,
    getJSONFromBaseObject
}
