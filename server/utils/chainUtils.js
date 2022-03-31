import {ChainId, Networks, supportedChainIds} from "@synapseprotocol/sdk";
import * as Cache from "./cache.js"

/**
 * @returns {String[]}
 */
function getIds() {
    let cachedRes = Cache.get(getIds);
    if (cachedRes) {
        return cachedRes;
    }

    let numIds = supportedChainIds();
    let strIds = [];
    numIds.forEach(numId => {
        strIds.push(numId.toString());
    });

    return Cache.set(getIds, strIds);
}

/**
 * @returns {String[]}
 */
function getHexIds() {
    let cachedRes = Cache.get(getHexIds);
    if (cachedRes) {
        return cachedRes;
    }

    let hexIds =[]
    supportedChainIds().forEach(id => hexIds.push("0x" + id.toString(16)));

    return Cache.set(getHexIds, hexIds);
}

/**
 * Returns a list of chain symbols.
 * @returns {String[]}
 */
function getNames() {
    let cachedRes = Cache.get(getNames);
    if (cachedRes) {
        return cachedRes;
    }

    let chainSymbols = [];
    Object.keys(Networks).forEach(key => {
        if (Networks[key] instanceof Networks.Network) {
            chainSymbols.push(key);
        }
    })

    return Cache.set(getNames, chainSymbols);
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
 * @param {string} chainId
 * @returns {Object}
 */
function getObjectFromId(chainId) {
    let cachedRes = Cache.get(getObjectFromId, [chainId]);
    if (cachedRes) {
        return cachedRes;
    }

    let networkObj = null;
    Object.keys(Networks).forEach(key => {
        if (Networks[key] instanceof Networks.Network && Networks[key].chainId.toString() === chainId) {
            networkObj = Networks[key];
        }
    })
    let resObj = _buildObjectFromSDKObject(networkObj)

    return Cache.set(getObjectFromId, resObj, [chainId]);
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
