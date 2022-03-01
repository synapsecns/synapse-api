import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
/**
 * Token represents an ERC20 token on Ethereum-based blockchains.
 */
export class BaseToken {
    name;
    symbol;
    addresses = {};
    swapType;
    isETH;
    hash;
    wrapperAddresses = {};
    _decimals = {};
    /**
     * Creates a new Token object with the defined arguments.
     * @param {Object} args Information about this token, including name, symbol, decimals, and
     * contract addresses.
     * @param {string} args.name Name of the token (example, "USD Circle")
     * @param {string} args.symbol Symbol of the token (example, "USDC")
     * @param {number|Object} args.decimals Either a single value, representing the token's ERC20 decimals value on all chains, or
     * a map in the format of { chain id => decimals for chain }.
     * If the latter is passed, values for ALL known chains must be provided.
     * @param {Object} args.addresses Mapping in the format of { chain id => address of token on chain },
     * providing the address of this token on different chains.
     * @param {SwapType} args.swapType Swap type of this token
     */
    constructor(args) {
        this.name = args.name;
        this.symbol = args.symbol;
        this.addresses = args.addresses;
        this.swapType = args.swapType;
        this.wrapperAddresses = args.wrapperAddresses ?? {};
        if (typeof args.decimals === "number") {
            for (const [k,] of Object.entries(this.addresses)) {
                this._decimals[k] = args.decimals;
            }
        }
        else {
            this._decimals = args.decimals;
        }
        this.isETH = args.isETH ?? false;
        this.hash = Symbol(this.symbol);
    }
    /**
     * Returns the address of this token on a given network, or null if
     * the token does not exist on the passed network.
     * @param {number} chainId Chain ID
     * @return {string|null} Token's contract address for the queried network, or null
     */
    address(chainId) {
        return this.addresses[chainId] || null;
    }
    wrapperAddress(chainId) {
        return this.wrapperAddresses[chainId] || null;
    }
    decimals(chainId) {
        return this._decimals[chainId] || null;
    }
    isEqual(other) {
        return this.hash === other.hash;
    }
    valueToWei(amt, chainId) {
        let amtStr = BigNumber.from(amt).toString();
        return parseUnits(amtStr, this.decimals(chainId));
    }
    get isWrappedToken() {
        return false;
    }
}
export class WrappedToken extends BaseToken {
    underlyingToken;
    constructor(args) {
        let { underlyingToken, ...tokenArgs } = args;
        super(tokenArgs);
        this.underlyingToken = underlyingToken;
    }
    get isWrappedToken() {
        return true;
    }
}
