import * as ChainUtils from "../utils/chainUtils.js";
import * as TokenUtils from "../utils/tokenUtils.js";
import {BigNumber} from "ethers";

/**
 * @param {String} param
 * @returns {boolean | Promise}
 */
function chainParamValidator(param) {
    if (ChainUtils.getNames().includes(param) ||
        ChainUtils.getIds().includes(param) ||
        ChainUtils.getHexIds().includes(param)
    ) {
        return true;
    }
    return Promise.reject("invalid chain param");
}

/**
 * @param {String} param
 * @returns {boolean | Promise}
 */
function tokenParamValidator(param) {
    if (TokenUtils.getSymbols().includes(param) ||
        TokenUtils.getAddresses().includes(param)
    ) {
        return true;
    }
    return Promise.reject("invalid token param");
}

/**
 * @param {String} param
 * @returns {boolean | Promise}
 */
function amountParamValidator(param) {
    try {
        let parsedNum = BigNumber.from(param);
        if (parsedNum.isNegative()) {
            throw new Error("amount cannot be negative");
        }
    } catch (err) {
        return Promise.reject("invalid amount param");
    }
    return true;
}

export { chainParamValidator, tokenParamValidator, amountParamValidator};
