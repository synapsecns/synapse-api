### FAQs

* Does this API generate signed transactions ?
  * No, this API simply generates a raw transaction and returns the result. You must sign this either on the [frontend](https://ethereum.stackexchange.com/a/122932) using a Web3 provider or on the [backend](https://ethereum.stackexchange.com/a/52784) using your private keys.
* How do I get Ether on a chain other than Ethereum, eg. Avalanche ?
  * Ether is Ethereum's native currency and hence is not an Ethereum token. Ether is represented as different flavors of *Wrapped* Ether on other chains, which are ERC-721 tokens. Use the `get_bridgeable_tokens` for a Chain, find the corresponding token that represents Ether (`WETH_E` for Avalanche, for eg.) and bridge to that!
* Does anything special need to be done when we bridge Ether from Ethereum vs an ERC-721 token ?
  * While bridging Ether from Ethereum only, the `generate_unsigned_bridge_txn` returns a `value` attribute in the returned JSON which must be passed in the transaction. For transferring any other ERC-721 tokens, the value is 0 and does not need to be specified.
* I am writing my app in Python/Rust/etc. Is there an SDK available for my language ?
    * Currently, we only have an SDK for JavaScript available at [synapsecns/sdk](https://github.com/synapsecns/sdk). If you're building an app in another language and wish to integrate Synapse, please use this API.

### Query Parameter Inputs

* `chain`/`chainFrom`/`chainTo`: Accepts a chain symbol (eg. *ETHEREUM*, *BSC*, *ARBITRUM*, etc.), a decimal (*1*, *56*, *42161*) or lower-case hexadecimal (*0x1*, *0x32*, *0xa4b1*) representation of Chain ID. Chain Symbols and Chain IDs can be found in the SDK. See [chainid.ts](https://github.com/synapsecns/sdk/blob/master/src/common/chainid.ts#L1).
* `tokenFrom`/`tokenTo`: Accepts a token symbol (eg. *DAI*, *USDC*, *ETH*, etc.) or token address on chain (eg. *0x6b175474e89094c44da98b954eedeac495271d0f*). Token symbols and addresses can be found in the SDK. See [tokens.ts](https://github.com/synapsecns/sdk/blob/master/src/tokens.ts).
* `amount`/`amountFrom`: Denoted in *wei*, accepts a decimal (eg. *100000000000*) or lower case hexadecimal number (eg. *0x174876e800*). Parsed as a [BigNumber](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber).

