import { SwapPools, TokenSwap } from "@synapseprotocol/sdk";

import { validateData } from "../utils/validate.js";

const tokens = (req, res) => {
  const ret = validateData(req.params, "swapTokens");
  if (ret !== true) return res.status(400).json(ret);

  const { chainId } = req.params;

  res.json({
    nusd: SwapPools.stableswapPoolForNetwork(chainId),
    neth: SwapPools.ethSwapPoolForNetwork(chainId),
  });
};

const quote = async (req, res) => {
  const ret = validateData(req.query, "swapQuote");
  if (ret !== true) return res.status(400).json(ret);

  const ret1 = validateData(req.params, "swapTokens");
  if (ret1 !== true) return res.status(400).json(ret1);

  // TODO: Allow user defined slippage?
  const { tokenFrom, tokenTo, amountIn } = req.query;
  const { chainId } = req.params;

  const args = {
    chainId,
    tokenFrom,
    tokenTo,
    amountIn,
  };

  const { amountOut: minAmountOut } = await TokenSwap.calculateSwapRate(args);

  res.json({
    allowanceTarget: tokenFrom.addresses[chainId],
    minAmountOut: minAmountOut.toString(),
    ...(await TokenSwap.buildSwapTokensTransaction({
      minAmountOut,
      ...args,
    })),
  });
};

export { tokens, quote };
