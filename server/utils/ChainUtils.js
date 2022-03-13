import {ChainId, Networks, supportedChainIds} from "@synapseprotocol/sdk";

/**
 * @returns {number[]}
 */
function getIds() {
    return supportedChainIds()
}

/**
 * @returns {String[]}
 */
function getHexIds() {
    let hexIds =[]
    getIds().forEach(id => hexIds.push("0x" + id.toString(16)));
    return hexIds;
}

/**
 * Returns a list of chain symbols.
 * @returns {String[]}
 */
function getNames() {
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
function getObjectFromId(chainId) {
    let networkObj = null;
    Object.keys(Networks).forEach(key => {
        if (Networks[key] instanceof Networks.Network && Networks[key].chainId.toString() === chainId) {
            networkObj = Networks[key];
        }
    })
    return (_buildObjectFromSDKObject(networkObj))
}

/**
 * Builds a JSON object from the SDK Network Class's Object
 * @param {Object} sdkNetworkObj
 * @returns {Object}
 */
function _buildObjectFromSDKObject(sdkNetworkObj) {
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
function getIdFromRequestQueryParam(chainParam) {
    // ParseInt converts hex and decimal strings to decimal representations
    let chainId = parseInt(chainParam);

    if (chainId in getIds()) {
        return chainId;
    }
    if (isNaN(chainId)) {
        chainId = ChainId[chainParam]
    }
    return chainId ? chainId : null;
}


export {
    getIds,
    getHexIds,
    getNames,
    getObjectFromId,
    getIdFromRequestQueryParam,
}
