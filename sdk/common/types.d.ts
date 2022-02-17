import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
export interface ChainIdTypeMap<T> {
    [chainId: number]: T;
}
export declare type AddressMap = ChainIdTypeMap<string>;
export declare type DecimalsMap = ChainIdTypeMap<number>;
export declare type SignerOrProvider = Signer | Provider;
