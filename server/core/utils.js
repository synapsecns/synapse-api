import {Tokens, BaseToken} from "@synapseprotocol/sdk"

/**
 * @returns {string[]}
 */
function getTokenSymbols() {
    let tokenSymbols = [];
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            tokenSymbols.push(key);
        }
    })
    return tokenSymbols;
}

/**
 * Returns list of token addresses across all chains
 * @returns {string[]}
 */
function getTokenAddresses() {
    let tokenAddresses = [];
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            const token = Tokens[key];
            Object.keys(token.addresses).forEach(key => {
                tokenAddresses.push(token.addresses[key]);
            })
        }
    })
    return tokenAddresses;
}

/**
 * @returns {Object[]}
 */
function getAllTokensObj() {
    // TODO: Cache
    let tokenObjList = [];
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            let tokenObj = buildTokenObject(Tokens[key]);
            tokenObjList.push(tokenObj);
        }
    })
    return tokenObjList;
}

/**
 * @param {String} address
 * @returns {Object|null}
 */
function getTokenFromAddress(address) {
    // TODO: Cache
    let tokenObj = null;
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            const token = Tokens[key];
            let tokenAddresses = [];
            Object.keys(token.addresses).forEach(key => {
                tokenAddresses.push(token.addresses[key]);
            });
            if (tokenAddresses.includes(address)) {
                tokenObj = getTokenFromSymbol(token.symbol);
            }
        }
    })
    return tokenObj;
}

/**
 * @param {String} symbol
 * @returns {Object}
 */
function getTokenFromSymbol(symbol) {
    let tokenObj = null;
    Object.keys(Tokens).forEach(key => {
        if (Tokens[key] instanceof BaseToken) {
            if (Tokens[key].symbol === symbol) {
                tokenObj = buildTokenObject(Tokens[key]);
            }
        }
    })
    return tokenObj;
}

/**
 * @param {String} tokenParam
 * @returns {Object}
 */
function getTokenSymbolFromQueryParam(tokenParam) {
    let token = getTokenFromSymbol(tokenParam);
    if (!token) {
        token = getTokenFromAddress(tokenParam);
    }
    return token ? token.symbol : null;
}

function buildTokenObject(sdkToken) {
    // TODO: Expand fields ?
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

export {
    getTokenSymbols,
    getTokenAddresses,
    getTokenFromAddress,
    getTokenFromSymbol,
    getTokenSymbolFromQueryParam,
    getAllTokensObj
}
