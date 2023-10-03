const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const client = new MongoClient(mongoURI);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(); // Return the database instance
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    throw err; // Propagate the error
  } 
}

module.exports = connectToMongoDB;
