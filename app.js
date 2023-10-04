const express = require("express");
const apiRouter = require("./apiRoutes");
const { connectToMongoDB } = require("./db");

const app = express();

connectToMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/crud', apiRouter);

module.exports = app;