import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { L2BridgeZap, L2BridgeZapInterface } from "../L2BridgeZap";
export declare class L2BridgeZap__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): L2BridgeZapInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): L2BridgeZap;
}
