import { Signer } from "@ethersproject/abstract-signer";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { PopulatedTransaction, ContractTransaction } from "@ethersproject/contracts";
export declare const MAX_APPROVAL_AMOUNT: BigNumber;
export declare namespace ERC20 {
    interface ApproveArgs {
        spender: string;
        amount?: BigNumberish;
    }
    interface ERC20TokenParams {
        tokenAddress: string;
        chainId: number;
    }
    const approve: (approveArgs: ApproveArgs, tokenParams: ERC20TokenParams, signer: Signer, dryRun?: boolean) => Promise<boolean | ContractTransaction>;
    const buildApproveTransaction: (approveArgs: ApproveArgs, tokenParams: ERC20TokenParams) => Promise<PopulatedTransaction>;
    const balanceOf: (address: string, tokenParams: ERC20TokenParams) => Promise<BigNumber>;
    const allowanceOf: (owner: string, spender: string, tokenParams: ERC20TokenParams) => Promise<BigNumber>;
}
