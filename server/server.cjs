require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;
const db = require("./db.cjs");
const path = require("path");

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/api/places", async (req, res) => {
    console.log("getPlaces start");

    db.getPlaces()
        .then((data) => {
            console.log("getPlaces: ", data.rows);
            res.json({ success: true, places: data.rows });
        })
        .catch((err) => {
            console.log("getPlaces error: ", err);
            res.json({ success: false });
        });
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
