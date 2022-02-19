import { ChainId } from "../common/chainid.js";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
export var GasUtils;
(function (GasUtils) {
    const makeGwei = (n) => parseUnits(n, "gwei");
    const ETH_GAS_PARAMS = {
        maxPriorityFee: makeGwei("1.5"),
        bridgeGasLimit: BigNumber.from(100000)
    };
    const BOBA_GAS_PARAMS = {
        gasPrice: makeGwei("10"),
        approveGasLimit: BigNumber.from(60000),
    };
    const ARBITRUM_GAS_PARAMS = {
        gasPrice: makeGwei("2.5"),
        bridgeGasLimit: BigNumber.from(1500000),
    };
    const AVALANCHE_GAS_PARAMS = {
        gasPrice: makeGwei("150"),
        bridgeGasLimit: BigNumber.from(800000),
        approveGasLimit: BigNumber.from(75000),
    };
    const AURORA_GAS_PARAMS = {
        gasPrice: makeGwei('0'),
    };
    function makeGasParams(chainId) {
        switch (chainId) {
            case ChainId.ETH:
                return ETH_GAS_PARAMS;
            case ChainId.BOBA:
                return BOBA_GAS_PARAMS;
            case ChainId.ARBITRUM:
                return ARBITRUM_GAS_PARAMS;
            case ChainId.AVALANCHE:
                return AVALANCHE_GAS_PARAMS;
            case ChainId.AURORA:
                return AURORA_GAS_PARAMS;
        }
        return {};
    }
    GasUtils.makeGasParams = makeGasParams;
    function populateGasParams(chainId, txn, gasLimitKind) {
        return Promise.resolve(txn)
            .then((tx) => {
            let { maxPriorityFee, gasPrice, approveGasLimit, bridgeGasLimit } = makeGasParams(chainId);
            if (gasPrice)
                tx.gasPrice = gasPrice;
            if (maxPriorityFee)
                tx.maxPriorityFeePerGas = maxPriorityFee;
            switch (gasLimitKind) {
                case "bridge":
                    if (bridgeGasLimit)
                        tx.gasLimit = bridgeGasLimit;
                    break;
                case "approve":
                    if (approveGasLimit)
                        tx.gasLimit = approveGasLimit;
                    break;
            }
            return tx;
        });
    }
    GasUtils.populateGasParams = populateGasParams;
})(GasUtils || (GasUtils = {}));
