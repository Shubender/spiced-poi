const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");
const aws = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

const { AWS_KEY, AWS_SECRET, AWS_BUCKET } = process.env;

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "..", "public/images"));
    },
    filename: (req, file, callback) => {
        uidSafe(12).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, // file should not exceed 2 MB
    },
});

const s3 = new aws.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
});

function fileUpload(req, res, next) {
    if (!req.file) {
        console.log("[socialNetwork:s3] file not there: ", req.file);
        res.statusCode = 400;
        res.send();
    } else {
        const { mimetype, filename, path, size } = req.file;
        const fileContent = fs.readFileSync(path);

        s3.putObject({
            Bucket: AWS_BUCKET,
            ACL: "public-read", // file is publicly available and can be read by anyone
            Key: filename, //filename,
            Body: fileContent, // file content
            ContentType: mimetype,
            ContentLength: size,
        })
            .promise()
            .then(() => {
                // We know upload was successful we save url into `res.locals`
                res.locals.fileUrl = `https://s3.amazonaws.com/${AWS_BUCKET}/${filename}`;
                next();
            })
            .catch((err) => {
                console.log("[socialNetwork:s3] error uploading to s3", err);
                res.sendStatus(500);
            });
    }
}

module.exports = { uploader, fileUpload };
