import * as chains from "./networks.js"
import * as tokens from "./tokens.js"

/**
 * @returns {String[]}
 */
function getChainNames() {
    return Object.keys(chains.ChainId)
}

/**
 * @returns {number[]}
 */
function getChainIds() {
    return Object.values(chains.ChainId)
}

/**
 * @param {string} chainId
 * @returns {Object}
 */
function getChainFromId(chainId) {
    for (const [_, value] of Object.entries(chains)) {
        if (value.chainId && (value.chainId.toString() === chainId)) {
            return value;
        }
    }
    return null;
}

/**
 * Takes in a string which could be a chainId or symbol
 * and returns a numeric representation of the chainId
 * @param {String} chainParam
 * @returns {number|null}
 */
function getChainIdFromParam(chainParam) {
    let chainId = parseInt(chainParam);
    if (chainId in getChainIds()) {
        return chainId;
    }
    if (isNaN(chainId)) {
        chainId = chains.ChainId[chainParam]
    }
    return chainId ? chainId : null;
}

/**
 * @returns {string[]}
 */
function getTokenSymbols() {
    return Object.keys(tokens)
}

/**
 * @returns {string[]}
 */
function getTokenHashes() {
    // TODO: Cache
    let tokenHashes = []
    for (const [_, tokenObj] of Object.entries(tokens)) {
        tokenHashes = tokenHashes.concat(Object.values(tokenObj.addresses))
    }
    return tokenHashes;
}

/**
 * @param {String} address
 * @returns {Object|null}
 */
function getTokenFromAddress(address) {
    // TODO: Cache
    for (const [_, tokenObj] of Object.entries(tokens)) {
        // Check the token address against each chain address
        const tokenAddresses = new Set(Object.values(tokenObj.addresses))
        if (tokenAddresses.has(address)) {
            return tokenObj;
        }
    }
    return null;
}

/**
 * @param {String} symbol
 * @returns {Object}
 */
function getTokenFromSymbol(symbol) {
    for (const [_, tokenObj] of Object.entries(tokens)) {
        if (symbol === tokenObj.symbol) {
            return tokenObj;
        }
    }
    return null;
}

/**
 * @param {String} tokenParam
 * @returns {Object}
 */
function getTokenSymbolFromParam(tokenParam) {
    let token = getTokenFromSymbol(tokenParam);
    if (!token) {
        token = getTokenFromAddress(tokenParam);
    }
    return token ? token.symbol : null;
}

export {
    getChainNames,
    getChainIds,
    getTokenSymbols,
    getTokenHashes,
    getTokenFromAddress,
    getTokenFromSymbol,
    getChainIdFromParam,
    getTokenSymbolFromParam,
    getChainFromId,
}

