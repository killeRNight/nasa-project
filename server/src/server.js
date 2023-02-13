/*
Why running server using http package?
It nedded to run WebSockets in future.
*/

const http = require("http");
require('dotenv').config();

const app = require("./app");
const { mongoConnect } = require("./services/mongo.service");
const { loadPlanetsData } = require("./models/planets.model");
const {loadLaunchData} = require('./models/launches.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// Csv-parser is a stream (async)
async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
