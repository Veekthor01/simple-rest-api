const express = require("express");
const apiRouter = require("./apiRoutes");
const { connectToMongoDB } = require("./db");
const { closeMongoDBConnection } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/crud', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
      console.log('Http server closed.');
      closeMongoDBConnection();
      process.exit(0);
    });
  });

