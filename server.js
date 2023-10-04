const app = require("./app");
const { closeMongoDBConnection } = require("./db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
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

