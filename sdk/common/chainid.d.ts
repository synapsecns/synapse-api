import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
export declare namespace ChainId {
    const ETH: number;
    const OPTIMISM: number;
    const BSC: number;
    const POLYGON: number;
    const FANTOM: number;
    const BOBA: number;
    const MOONBEAM: number;
    const MOONRIVER: number;
    const ARBITRUM: number;
    const AVALANCHE: number;
    const AURORA: number;
    const HARMONY: number;
    const asBigNumber: (n: BigNumberish) => BigNumber;
    const asNumber: (n: BigNumberish) => number;
    const supportedChainIds: () => number[];
}
export declare const supportedChainIds: () => number[];
