import * as tokens from "./tokens.js"
import {supportedChainIds, Networks, ChainId} from "@synapseprotocol/sdk"

/**
 * @returns {number[]}
 */
function getChainIds() {
    return supportedChainIds()
}

/**
 * @returns {String[]}
 */
function getHexChainIds() {
    let hexIds =[]
    getChainIds().forEach(id => hexIds.push("0x" + id.toString(16)));
    return hexIds;
}

/**
 * @returns {String[]}
 */
function getChainNames() {
    // Effectively returns the keys of CHAINID_NETWORK_MAP
    let chainSymbols = [];
    Object.keys(Networks).forEach(key => {
        if (Networks[key] instanceof Networks.Network) {
            chainSymbols.push(key);
        }
    })
    return chainSymbols;
}

/**
 * @param {string} chainId
 * @returns {Object}
 */
function getChainObjFromId(chainId) {
    let networkObj = null;
    Object.keys(Networks).forEach(key => {
        if (Networks[key] instanceof Networks.Network && Networks[key].chainId.toString() === chainId) {
            networkObj = Networks[key];
        }
    })

    // TODO: Expand fields ?
    return {
        name: networkObj.name,
        chainId: networkObj.chainId,
        chainCurrency: networkObj.chainCurrency
    };
}

/**
 * Takes in a string which could be a chainId or symbol
 * and returns a numeric representation of the chainId
 * @param {String} chainParam
 * @returns {number|null}
 */
function getChainIdFromQueryParam(chainParam) {
    // ParseInt converts hex and decimal strings to decimal representations
    let chainId = parseInt(chainParam);

    if (chainId in getChainIds()) {
        return chainId;
    }
    if (isNaN(chainId)) {
        chainId = ChainId[chainParam]
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
    getHexChainIds,
    getTokenSymbols,
    getTokenHashes,
    getTokenFromAddress,
    getTokenFromSymbol,
    getChainIdFromQueryParam,
    getTokenSymbolFromParam,
    getChainObjFromId,
}
