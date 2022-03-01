import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { L1BridgeZap, L1BridgeZapInterface } from "../L1BridgeZap";
export declare class L1BridgeZap__factory {
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
    static createInterface(): L1BridgeZapInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): L1BridgeZap;
}
