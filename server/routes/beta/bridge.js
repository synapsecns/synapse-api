import asyncHandler from "express-async-handler";
import express from "express";

import { tokens, quote } from "./handlers/bridge.js";

const router = express.Router();

router.get("/tokens", tokens);
router.get("/quote", asyncHandler(quote));

export default router;
