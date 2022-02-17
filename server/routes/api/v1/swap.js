import express from "express";

import { validateData } from "../../../utils/validate.js";
import { Bridges } from "../../../utils/cache.js";

const nullAddr = "0x0000000000000000000000000000000000000000";
const router = express.Router();

router.get("/quote", async (req, res) => {
  const ret = validateData(req.query, "swapQuote");
  if (ret !== true) return res.status(400).json(ret);

  const { chainIdFrom, chainIdTo, tokenTo, tokenFrom, amountFrom } = req.query;

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
