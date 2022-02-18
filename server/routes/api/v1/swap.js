import express from "express";

import { allTokens, Bridges } from "../../../utils/cache.js";
import { validateData, v } from "../../../utils/validate.js";

const nullAddr = "0x0000000000000000000000000000000000000000";
const router = express.Router();

router
  .get("/tokens", (req, res) => {
    const ret = validateData(req.query, "swapTokens");
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
  })

  .get("/quote", async (req, res) => {
    const ret = validateData(req.query, "swapQuote");
    if (ret !== true) return res.status(400).json(ret);

    const { chainIdFrom, chainIdTo, tokenTo, tokenFrom, amountFrom } =
      req.query;

    const bridge = Bridges[chainIdFrom];

    // TODO: wrap try-catch into middleware
    try {
      res.json({
        ...(await bridge.estimateBridgeTokenOutput({
          tokenFrom,
          chainIdTo,
          tokenTo,
          amountFrom,
        })),
        allowanceTarget: tokenFrom.addresses[chainIdFrom] || nullAddr,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

export default router;
