import { allTokens, Bridges } from "../utils/cache.js";
import { validateData, v } from "../utils/validate.js";

const nullAddr = "0x0000000000000000000000000000000000000000";

const tokens = (req, res) => {
  const ret = validateData(req.query, "bridgeTokens");
  if (ret !== true) return res.status(400).json(ret);

  const { chainIdFrom, chainIdTo } = req.query;
  if (chainIdTo && !chainIdFrom)
    return res.status(400).json([
      {
        type: "chainIdPairMismatch",
        message: v.messages.chainIdPairMismatch,
        field: "chainIdTo",
      },
    ]);

  if (chainIdFrom)
    res.json(
      chainIdTo ? allTokens[chainIdFrom][chainIdTo] : allTokens[chainIdFrom]
    );
  else res.json(allTokens);
};

const quote = async (req, res) => {
  const ret = validateData(req.query, "bridgeQuote");
  if (ret !== true) return res.status(400).json(ret);

  const { chainIdFrom, amountFrom, addressTo, chainIdTo, tokenFrom, tokenTo } =
    req.query;

  const bridge = Bridges[chainIdFrom];

  const estimate = await bridge.estimateBridgeTokenOutput({
    tokenFrom,
    chainIdTo,
    tokenTo,
    amountFrom,
  });

  res.json({
    allowanceTarget: tokenFrom.addresses[chainIdFrom] || nullAddr,
    amountToReceive: estimate.amountToReceive.toString(),
    bridgeFee: estimate.bridgeFee.toString(),
    ...(await bridge.buildBridgeTokenTransaction({
      tokenFrom,
      chainIdTo,
      tokenTo,
      addressTo,
      amountFrom,
      amountTo: estimate.amountToReceive,
    })),
  });
};

export { quote, tokens };
