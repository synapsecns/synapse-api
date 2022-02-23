const ChainId = {
    ETH: 1,
    OPTIMISM: 10,
    BSC: 56,
    POLYGON: 137,
    FANTOM: 250,
    BOBA: 288,
    MOONBEAM: 1284,
    MOONRIVER: 1285,
    ARBITRUM: 42161,
    AVALANCHE: 43114,
    AURORA: 1313161554,
    HARMONY: 1666600000,
}

const ETH = {
    name: "Ethereum Mainnet",
    chainId: ChainId.ETH,
    chainCurrency: "ETH"
};

const OPTIMISM = {
    name:          "Optimism",
    chainId:       ChainId.OPTIMISM,
    chainCurrency: "ETH"
}

const BSC = {
    name:          "Binance Smart Chain",
    chainId:       ChainId.BSC,
    chainCurrency: "BNB",
};

const POLYGON = {
    name:          "Polygon",
    chainId:       ChainId.POLYGON,
    chainCurrency: "MATIC",
};

const FANTOM = {
    name:          "Fantom",
    chainId:       ChainId.FANTOM,
    chainCurrency: "FTM",
};

const BOBA = {
    name:         "Boba Network",
    chainId:       ChainId.BOBA,
    chainCurrency: "ETH",
};

const MOONBEAM = {
    name:          "Moonbeam",
    chainId:        ChainId.MOONBEAM,
    chainCurrency: "GLMR",
}

const MOONRIVER = {
    name:          "Moonriver",
    chainId:       ChainId.MOONRIVER,
    chainCurrency: "MOVR",
};

const ARBITRUM = {
    name:          "Arbitrum",
    chainId:       ChainId.ARBITRUM,
    chainCurrency: "ETH",
};

const AVALANCHE = {
    name:          "Avalanche C-Chain",
    chainId:       ChainId.AVALANCHE,
    chainCurrency: "AVAX",
};

const AURORA = {
    name:          "Aurora",
    chainId:       ChainId.AURORA,
    chainCurrency: "aETH",
};

const HARMONY = {
    name:          "Harmony",
    chainId:       ChainId.HARMONY,
    chainCurrency: "ONE",
};

export {
    ChainId,
    ETH,
    OPTIMISM,
    BSC,
    POLYGON,
    FANTOM,
    BOBA,
    MOONBEAM,
    MOONRIVER,
    ARBITRUM,
    AVALANCHE,
    AURORA,
    HARMONY
}