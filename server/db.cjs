require("dotenv").config();
const { DATABASE_URL } = process.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(DATABASE_URL);

module.exports.getPlaces = () => {
    return db.query(`SELECT * FROM places`);
};

module.exports.createPlace = (
    imgUrl,
    description,
    filename,
    lng,
    lat,
    color
) => {
    return db.query(
        `INSERT INTO places (url, description, name, longitude, latitude, color) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [imgUrl, description, filename, lng, lat, color]
    );
};
