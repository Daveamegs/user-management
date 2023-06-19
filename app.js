require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");

const app = express();

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_TYPE = process.env.DB_TYPE;
const DB_ENGINE = process.env.DB_ENGINE

app.use(express.json())
app.use("/users", router);


mongoose.connect(
    `${DB_TYPE}+${DB_ENGINE}://${DB_USER}:${DB_PASSWORD}@${DB_NAME}/?retryWrites=true&w=majority`
    ).then(() => app.listen(PORT, () => console.log("Connected and Listening on port " + PORT)))
    .catch(err => console.log(err.message));