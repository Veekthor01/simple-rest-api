const mongoose = require ("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
    console.log("Connected to MongoDB")
});

module.exports = db;