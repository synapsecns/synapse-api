import { BigNumber } from "@ethersproject/bignumber";
import { PopulatedTransaction } from "ethers";
export declare namespace GasUtils {
    interface GasParams {
        maxPriorityFee?: BigNumber;
        gasPrice?: BigNumber;
        bridgeGasLimit?: BigNumber;
        approveGasLimit?: BigNumber;
    }
    function makeGasParams(chainId: number): GasParams;
    function populateGasParams(chainId: number, txn: PopulatedTransaction | Promise<PopulatedTransaction>, gasLimitKind: string): Promise<PopulatedTransaction>;
}
