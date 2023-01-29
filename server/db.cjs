require("dotenv").config();
const { DATABASE_URL } = process.env;
// const { DATABASE_URL } = import.meta.env;
const spicedPg = require("spiced-pg");
const db = spicedPg(DATABASE_URL);

module.exports.getPlaces = () => {
    console.log("DATABASE_URL: ", DATABASE_URL);
    return db.query(`SELECT * FROM places`);
};
