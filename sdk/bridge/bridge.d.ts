import { Networks } from "../common/networks";
import type { Token } from "../token";
import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ContractTransaction, PopulatedTransaction } from "@ethersproject/contracts";
export declare namespace Bridge {
    type CheckCanBridgeResult = [boolean, BigNumber];
    interface BridgeOutputEstimate {
        amountToReceive: BigNumber;
        bridgeFee: BigNumber;
    }
    interface BridgeParams {
        tokenFrom: Token;
        tokenTo: Token;
        chainIdTo: number;
        amountFrom?: BigNumber;
    }
    interface BridgeTransactionParams extends BridgeParams {
        amountFrom: BigNumber;
        amountTo: BigNumber;
        addressTo?: string;
    }
    class SynapseBridge {
        protected network: Networks.Network;
        protected chainId: number;
        protected provider: Provider;
        private readonly bridgeAddress;
        private readonly bridgeInstance;
        private readonly networkZapBridgeInstance;
        private readonly isL2Zap;
        private readonly zapBridgeAddress;
        private readonly bridgeConfigInstance;
        private readonly zapBridgeInstance;
        readonly requiredConfirmations: number;
        constructor(args: {
            network: Networks.Network | number;
            provider?: Provider;
        });
        bridgeVersion(): Promise<BigNumber>;
        WETH_ADDRESS(): Promise<string>;
        swapSupported(args: {
            tokenFrom: Token;
            tokenTo: Token;
            chainIdTo: number;
        }): [boolean, string];
        estimateBridgeTokenOutput(args: BridgeParams): Promise<BridgeOutputEstimate>;
        buildBridgeTokenTransaction(args: BridgeTransactionParams): Promise<PopulatedTransaction>;
        executeBridgeTokenTransaction(args: BridgeTransactionParams, signer: Signer): Promise<ContractTransaction>;
        buildApproveTransaction(args: {
            token: Token | string;
            amount?: BigNumberish;
        }): Promise<PopulatedTransaction>;
        executeApproveTransaction(args: {
            token: Token | string;
            amount?: BigNumberish;
        }, signer: Signer): Promise<ContractTransaction>;
        getAllowanceForAddress(args: {
            address: string;
            token: Token;
        }): Promise<BigNumber>;
        private checkNeedsApprove;
        private checkHasBalance;
        private checkCanBridge;
        private buildERC20ApproveArgs;
        private checkSwapSupported;
        private calculateBridgeRate;
        private checkEasyArgs;
        private buildETHMainnetBridgeTxn;
        private buildL2BridgeTxn;
        private makeBridgeTokenArgs;
    }
    function getRequiredConfirmationsForBridge(network: Networks.Network | number): number;
}
