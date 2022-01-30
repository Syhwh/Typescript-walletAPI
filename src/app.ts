import { loadControllers } from "awilix-express";
import express from "express";
import loadContainer from './container';

import dotenv = require('dotenv');

dotenv.config();

const app: express.Application = express();

app.use(express.json());

// ID containter
loadContainer(app);

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export { app };