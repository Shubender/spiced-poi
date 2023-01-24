const express = require("express");
const app = express();
const { PORT = 3001 } = process.env;

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});