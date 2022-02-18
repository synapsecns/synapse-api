import asyncHandler from "express-async-handler";
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
  .get(
    "/quote",
    asyncHandler(async (req, res) => {
      const ret = validateData(req.query, "swapQuote");
      if (ret !== true) return res.status(400).json(ret);

      const {
        chainIdFrom,
        amountFrom,
        addressTo,
        chainIdTo,
        tokenFrom,
        tokenTo,
      } = req.query;

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
    })
  );

export default router;
