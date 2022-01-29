import express from "express";

export const app: express.Application = express();

app.get('/', (req, res) => res.send('works really'));