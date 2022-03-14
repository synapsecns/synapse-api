/**
 * @fileOverview This file implements an in-memory Write Once Read Many (WORA)
 * cache which specifically caches responses from function signatures
 */

let _CACHE = {}

/**
 * Concatenates the function name with attributes, returning that as the key
 *
 * @param {function} fn
 * @param {Array} attrs
 * @returns {String}
 */
function _buildKey(fn, attrs) {
    return (fn.toString()).concat(attrs.toString());
}

/**
 * Takes in a function along with it's params and the resultant output
 * and caches the output for that function signature (name + params)
 *
 * @param {function} fn
 * @param {any} res
 * @param {Array} attrs
 * @returns {any}
 */
export function set(fn, res, attrs=[]) {
    const key = _buildKey(fn, attrs);
    _CACHE[key] = res;
    return _CACHE[key];
}

/**
 * Takes in a function along with it's params and the resultant output
 * and returns the cached output for that function signature, or null
 *
 * @param {function} fn
 * @param {Array} attrs
 * @returns {any}
 */
export function get(fn, attrs=[]) {
    const key = _buildKey(fn, attrs);
    return _CACHE[key] ? _CACHE[key] : null;
}
