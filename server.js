const express = require("express");
const apiRouter = require("./apiRoutes");
const connectToMongoDB = require("./db"); // Import the MongoDB connection function

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/crud', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

