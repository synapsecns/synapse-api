import {supportedChainIds, Networks, ChainId, Tokens, BaseToken} from "@synapseprotocol/sdk"

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
 * Returns a list of chain symbols.
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
    return (buildChainObj(networkObj))
}

function buildChainObj(sdkNetworkObj) {
    // TODO: Expand fields ?
    return {
        name: sdkNetworkObj.name,
        chainId: sdkNetworkObj.chainId,
        chainCurrency: sdkNetworkObj.chainCurrency
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
    getChainNames,
    getChainIds,
    getHexChainIds,
    getTokenSymbols,
    getTokenAddresses,
    getTokenFromAddress,
    getTokenFromSymbol,
    getChainIdFromQueryParam,
    getTokenSymbolFromQueryParam,
    getChainObjFromId,
    getAllTokensObj
}
