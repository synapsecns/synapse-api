# synapse-api

## Proposed Specsheet/outline
Broad format should be in the form of a rest api, usually likely to be get requests, below writing the format in func signature form
Ex: estimateFinalBridgeOutput(fromChainId, toChainId, fromToken, toToken, amount) =>
`/v1/estimate_final_bridge_amount?fromChainId=1&toChainId=56&fromToken="USDC"...`

- generateUnsignedBridgeApprovalTxn(fromChainId, fromToken) =>  {unsigned_data: <unsigned txn data>, otherInfo...}
  `/v1/generate_unsigned_bridge_approval_txn?fromChainId=1&fromToken="USDC"...`
  Generates the unsigned txn data for approval transaction required for approving spend of a given coin


- generateUnsignedBridgeTxn(fromChainId, toChainId, fromToken, toToken) => {unsigned_data: <unsigned txn data>, otherInfo...}
  `/v1/generate_unsigned_bridge_txn?fromChainId=1&toChainId=56&fromToken="USDC"...`



- generateBridgeTxnParams(fromChainId, toChainId, fromToken, toToken) => <Some Bridge Params Obj>
  `/v1/generate_unsigned_bridge_txn?fromChainId=1&toChainId=56&fromToken="USDC"...`


- estimateBridgeOutput(fromChainId, toChainId, fromToken, toToken, amount) => {estimatedRecieveAmount, otherInfo...}
  `/v1/estimate_bridge_output?fromChainId=1&toChainId=56&fromToken="USDC"...input_token_amount=<BigNumber value>`

- getBridgableTokens(chainId) => <list of valid tokens available to bridge from a given chain >
  `/v1/get_bridgable_tokens?chainId=1`

- getChainsForTokens(token) => <list of valid chainIds for a given token>
  `/v1/get_chains_for_token?token_address=<address>`

-


Broad Guidelines
- coins/tokens: should be able to be passed as an address (0x42424242424......069696969696), tokenObject (new Token(<USDC>)), OR key string ("USDC")
-  chainId: should be able to be passed as either a number (1, 56 etc...), chainname/chainenum ("ETH", "BSC"...) or (ChainId.ETH, ChainId.BSC)
- amounts: make sure BigNumber handling is done correctly
- Error messages should be handled gracefully in scenarios where invalid inputs are given etc.  Error messages should be informative vs generic stack traces
