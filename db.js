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
    throw err;
  } 
}

// Add a function to close the MongoDB connection
async function closeMongoDBConnection() {
    try {
      await client.close();
      console.log("MongoDB connection closed");
    } catch (err) {
      console.error(`Error closing MongoDB connection: ${err}`);
    }
  }
  
  module.exports = {
    connectToMongoDB,
    closeMongoDBConnection,
  };