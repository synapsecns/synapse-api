import { BigNumber } from "@ethersproject/bignumber";
import { ERC20Factory } from "../contracts.js";
import { newProviderForNetwork } from "../internal/rpcproviders.js";
import { executePopulatedTransaction, rejectPromise, } from "../common/utils.js";
import { GasUtils } from "./gasutils.js";
export const MAX_APPROVAL_AMOUNT = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
export var ERC20;
(function (ERC20_1) {
    class ERC20 {
        address;
        chainId;
        provider;
        instance;
        constructor(args) {
            this.address = args.tokenAddress;
            this.chainId = args.chainId;
            this.provider = newProviderForNetwork(this.chainId);
            this.instance = ERC20Factory.connect(this.address, this.provider);
        }
        approve = async (args, signer, dryRun) => {
            dryRun = dryRun ?? false;
            return dryRun
                ? this.instance.callStatic.approve(args.spender, args.amount ?? MAX_APPROVAL_AMOUNT, { from: signer.getAddress() })
                : executePopulatedTransaction(this.buildApproveTransaction(args), signer);
        };
        buildApproveTransaction = async (args) => {
            let { spender, amount } = args;
            amount = amount ?? MAX_APPROVAL_AMOUNT;
            return this.instance.populateTransaction.approve(spender, amount)
                .then((txn) => GasUtils.populateGasParams(this.chainId, txn, "approve"))
                .catch(rejectPromise);
        };
        balanceOf = async (address) => this.instance.balanceOf(address);
        allowanceOf = async (owner, spender) => this.instance.allowance(owner, spender);
    }
    ERC20_1.approve = async (approveArgs, tokenParams, signer, dryRun) => new ERC20(tokenParams).approve(approveArgs, signer, dryRun);
    ERC20_1.buildApproveTransaction = async (approveArgs, tokenParams) => new ERC20(tokenParams).buildApproveTransaction(approveArgs);
    ERC20_1.balanceOf = async (address, tokenParams) => new ERC20(tokenParams).balanceOf(address);
    ERC20_1.allowanceOf = async (owner, spender, tokenParams) => new ERC20(tokenParams).allowanceOf(owner, spender);
})(ERC20 || (ERC20 = {}));
