const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const { MongoMemoryServer } = require('mongodb-memory-server');
const bodyParser = require("body-parser");
const database = require("./config/db");
const cors = require('cors');

const app = express();
const port = 8000;
const mongoServer = new MongoMemoryServer();

(async () => {
    await database.getUrl(mongoServer).then(url => {
        createConnection(url);
    });
})();

function createConnection(url) {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            return console.log(err);
        }
    
        const database = client.db('autofi');
        initilizeServer(database)
    });
}

function initilizeServer(database) {
    configureServerOptions()
    require("./app/routes")(app, database);

    app.listen(port, () => {
        console.log("Server started...");
    });
}

function configureServerOptions() {
    var corsOptions = {
        origin: "*",
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-reset-token', 'x-invite-token', 'x-api-key', 'x-www-form-urlencoded'],
        credentials: true
    };
    app.use(cors(corsOptions));
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));
}
