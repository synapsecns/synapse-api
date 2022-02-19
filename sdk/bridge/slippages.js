import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
export var Slippages;
(function (Slippages) {
    Slippages.One = "ONE", Slippages.OneTenth = "ONE_TENTH", Slippages.TwoTenth = "TWO_TENTH", Slippages.Quarter = "QUARTER";
    function _applySlippage(inputValue, slippageSelected, add) {
        add = add ?? false;
        let numerator, denominator;
        switch (slippageSelected) {
            case Slippages.OneTenth:
                denominator = 1000;
                numerator = denominator + (add ? 1 : -1);
                break;
            case Slippages.TwoTenth:
                denominator = 500;
                numerator = denominator + (add ? 1 : -1);
                break;
            case Slippages.Quarter:
                denominator = 50;
                numerator = denominator + (add ? 1 : -1);
                break;
            default: // default to 1%
                denominator = 100;
                numerator = denominator + (add ? 1 : -1);
                break;
        }
        return inputValue.mul(numerator).div(denominator);
    }
    Slippages._applySlippage = _applySlippage;
    function addSlippage(inputValue, slippageSelected) {
        return _applySlippage(inputValue, slippageSelected, true);
    }
    Slippages.addSlippage = addSlippage;
    function subtractSlippage(inputValue, slippageSelected) {
        return _applySlippage(inputValue, slippageSelected, false);
    }
    Slippages.subtractSlippage = subtractSlippage;
    function formatSlippageToString(slippageSelected) {
        switch (slippageSelected) {
            case Slippages.One:
                return formatUnits(BigNumber.from(100), 2);
            case Slippages.OneTenth:
                return formatUnits(BigNumber.from(100), 3);
            case Slippages.TwoTenth:
                return formatUnits(BigNumber.from(200), 3);
            case Slippages.Quarter:
                return formatUnits(BigNumber.from(2000), 3);
            default:
                return "N/A";
        }
    }
    Slippages.formatSlippageToString = formatSlippageToString;
})(Slippages || (Slippages = {}));
