/**
 * @param {Object} obj
 * @returns {Object}
 */
function removeDecimalUnderscoreFromJSON(obj) {
    if (typeof obj === "object") {
        if (obj["_decimals"]) {
            obj["decimals"] = obj["_decimals"];
            delete obj["_decimals"];
        }

        for (let key in obj) {
            removeDecimalUnderscoreFromJSON(obj[key]);
        }
    }
}

export { removeDecimalUnderscoreFromJSON };
