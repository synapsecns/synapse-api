import asyncHandler from "express-async-handler";
import express from "express";

import { tokens, quote } from "./handlers/swap.js";

const router = express.Router();

router.get("/tokens/:chainId", tokens);
router.get("/quote/:chainId", asyncHandler(quote));

export default router;
