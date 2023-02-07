require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;
const db = require("./db.cjs");
const path = require("path");
const { uploader, fileUpload } = require("./file-upload.cjs");

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/api/places", async (req, res) => {
    // console.log("getPlaces start");

    db.getPlaces()
        .then((data) => {
            // console.log("getPlaces: ", data.rows[0]);
            res.json({ success: true, places: data.rows });
        })
        .catch((err) => {
            console.log("getPlaces error: ", err);
            res.json({ success: false });
        });
});

app.post(
    "/api/upload",
    uploader.single("file"),
    fileUpload,
    function (req, res) {
        // console.log("req.file: ", req.file);
        // console.log(
        //     "User input (server): ",
        //     req.body.description,
        //     req.body.lng,
        //     req.body.lat
        // );

        const imgUrl = res.locals.fileUrl;
        const description = req.body.description;
        const filename = req.file.filename;
        const lng = req.body.lng;
        const lat = req.body.lat;
        const color = req.body.color || "yellow";
        db.createPlace(imgUrl, description, filename, lng, lat, color).then(
            (data) => {
                if (req.file) {
                    console.log("User upload (server): ", data.rows[0]);
                    res.json({
                        success: true,
                        userFile: data.rows[0],
                    });
                } else {
                    res.json({
                        success: false,
                    });
                }
            }
        );
    }
);

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
