import type { Token } from "./token";
import { BaseToken, WrappedToken } from "./token";
export declare namespace Tokens {
    /**
     * The DAI stablecoin, available on Arbitrum, Avalanche, Binance Smart Chain, Ethereum, and Polygon.
     */
    const DAI: BaseToken;
    const BUSD: BaseToken;
    const USDC: BaseToken;
    const USDT: BaseToken;
    const UST: BaseToken;
    const ETH: BaseToken;
    /**
     * nETH is a token involved in the bridge.
     */
    const NETH: BaseToken;
    const WETH: BaseToken;
    const WETHBEAM: BaseToken;
    const WETH_E: BaseToken;
    const AVWETH: BaseToken;
    const ONE_ETH: BaseToken;
    const FTM_ETH: BaseToken;
    const SYN: BaseToken;
    /**
     * nUSD is a token involved in the bridge.
     */
    const NUSD: BaseToken;
    const AVAX: BaseToken;
    const WAVAX: WrappedToken;
    const MOVR: BaseToken;
    const WMOVR: WrappedToken;
    const GOHM: BaseToken;
    const MIM: BaseToken;
    const HIGH: BaseToken;
    const JUMP: BaseToken;
    const DOG: BaseToken;
    const NFD: BaseToken;
    const FRAX: BaseToken;
    const SYN_FRAX: BaseToken;
    const SOLAR: BaseToken;
    const GMX: BaseToken;
    const mintBurnTokens: Token[];
    function isMintBurnToken(token: Token): boolean;
}
