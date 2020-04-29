const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");
const cors = require('cors');
const app = express();

const port = 8000;

MongoClient.connect(db.url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log(err);
    }

    const database = client.db('autofi');

    var corsOptions = {
        origin: "*",
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-reset-token', 'x-invite-token', 'x-api-key', 'x-www-form-urlencoded'],
        credentials: true
    };
    app.use(cors(corsOptions));
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));
    require("./app/routes")(app, database);

    app.listen(port, () => {
        console.log("Server started...");
    });
});
