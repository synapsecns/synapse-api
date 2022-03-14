import {Tokens, BaseToken} from "@synapseprotocol/sdk"
import * as Cache from "./cache.js"

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

function _buildObjectFromSDKObject(sdkToken) {
    return {
        name: sdkToken.name,
        symbol: sdkToken.symbol,
        decimals: sdkToken._decimals,
        addresses: sdkToken.addresses,
        swapType: sdkToken.swapType,
        isETH: sdkToken.isETH,
        wrapperAddresses:sdkToken.wrapperAddresses
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
            let tokenObj = _buildObjectFromSDKObject(Tokens[key]);
            tokenObjList.push(tokenObj);
        }
    })

    return Cache.set(getObjects, tokenObjList);
}

/**
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
            if (Tokens[key].symbol === symbol) {
                tokenObj = _buildObjectFromSDKObject(Tokens[key]);
            }
        }
    })

    return Cache.set(getObjectFromSymbol, tokenObj, [symbol]);
}

/**
 * @param {String} address
 * @returns {Object|null}
 */
function getObjectFromAddress(address) {
    let cachedRes = Cache.get(getObjectFromAddress, [address]);
    if (cachedRes) {
        return cachedRes;
    }

    let tokenObj = null;
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            const token = Tokens[key];
            let tokenAddresses = [];
            Object.keys(token.addresses).forEach(key => {
                tokenAddresses.push(token.addresses[key]);
            });
            if (tokenAddresses.includes(address)) {
                tokenObj = getObjectFromSymbol(token.symbol);
            }
        }
    })

    return Cache.set(getObjectFromAddress, tokenObj, [address]);
}


/**
 * @param {String} tokenParam
 * @returns {Object}
 */
function getSymbolFromRequestQueryParam(tokenParam) {
    let token = getObjectFromSymbol(tokenParam);
    if (!token) {
        token = getObjectFromAddress(tokenParam);
    }
    return token ? token.symbol : null;
}


export {
    getSymbols,
    getAddresses,
    getObjects,
    getObjectFromAddress,
    getObjectFromSymbol,
    getSymbolFromRequestQueryParam,
}
