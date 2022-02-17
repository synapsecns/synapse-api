import { BigNumber } from "@ethersproject/bignumber";
export declare namespace Slippages {
    type Slippage = string;
    const One: Slippage, OneTenth: Slippage, TwoTenth: Slippage, Quarter: Slippage;
    function _applySlippage(inputValue: BigNumber, slippageSelected: string | Slippage, add?: boolean): BigNumber;
    function addSlippage(inputValue: BigNumber, slippageSelected: string | Slippage): BigNumber;
    function subtractSlippage(inputValue: BigNumber, slippageSelected: string | Slippage): BigNumber;
    function formatSlippageToString(slippageSelected: string | Slippage): string;
}
