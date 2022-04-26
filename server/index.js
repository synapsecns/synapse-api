#!/usr/bin/env node

import express from "express";
import "dotenv/config";

import v1Router from "./routes/v1/index.js";

const app = express();
const port = process.env.PORT ?? 8080;

app.use('/v1', v1Router);
app.get("/", (req, res) => {
    res.json({"message": "Welcome to Synapse Bridge API. Documentation at /apidoc"})
})

app.set('json spaces', 4);
app.use('/apidoc', express.static('docs/apidoc'));

app.use((err, req, res, next) => {
    res.status(500).json({error: err.message});
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});

export default app;
