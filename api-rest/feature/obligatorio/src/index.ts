import express from "express";
import path from "node:path";
import { ENV } from "./core/constants/index.js";
import {createRestApiServer, dbServer} from './core/servers/index.js';
import { logErrorRequestMiddleware, logRequestMiddleware } from "./common/middlewares/logger.middlewares.js";
import { houseAPI } from "./pods/house/index.js";

const app = createRestApiServer();

app.use("/", express.static(path.resolve(import.meta.dirname, ENV.STATIC_FILES_PATH)));

app.use(logRequestMiddleware);

app.use('/api/houses', houseAPI)

app.use(logErrorRequestMiddleware);

app.listen(ENV.PORT, async() => { 
    if(!ENV.IS_API_MOCK) {
        await dbServer.connect(ENV.MONGODB_URL);
    } else {
        console.log('Running Mock API');
    }
    console.log(`Server ready at port ${ENV.PORT}`);
})