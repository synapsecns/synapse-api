#!/usr/bin/env node

import express from "express";
import "dotenv/config";

import bridgeRouter from "./routes/v1/bridge.js";
import swapRouter from "./routes/v1/swap.js";

const app = express();
const port = process.env.port ?? 8080;

app.use("/api/v1/bridge", bridgeRouter);
app.use("/api/v1/swap", swapRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
