import { BigNumber } from "@ethersproject/bignumber";
export var ChainId;
(function (ChainId) {
    ChainId.ETH = 1;
    ChainId.OPTIMISM = 10;
    ChainId.BSC = 56;
    ChainId.POLYGON = 137;
    ChainId.FANTOM = 250;
    ChainId.BOBA = 288;
    ChainId.MOONBEAM = 1284;
    ChainId.MOONRIVER = 1285;
    ChainId.ARBITRUM = 42161;
    ChainId.AVALANCHE = 43114;
    ChainId.AURORA = 1313161554;
    ChainId.HARMONY = 1666600000;
    ChainId.asBigNumber = (n) => {
        return BigNumber.from(n);
    };
    ChainId.asNumber = (n) => {
        return BigNumber.from(n).toNumber();
    };
    ChainId.supportedChainIds = () => [
        ChainId.ETH, ChainId.OPTIMISM, ChainId.BSC,
        ChainId.POLYGON, ChainId.FANTOM, ChainId.BOBA,
        ChainId.MOONBEAM, ChainId.MOONRIVER, ChainId.ARBITRUM,
        ChainId.AVALANCHE, ChainId.AURORA, ChainId.HARMONY,
    ];
})(ChainId || (ChainId = {}));
export const supportedChainIds = ChainId.supportedChainIds;
