const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const client = new MongoClient(mongoURI);
let dbInstance = null; // Store the database instance

async function connectToMongoDB() {
  try {
    if (!dbInstance) {
      await client.connect();
      dbInstance = client.db(); // Store the database instance once
      //console.log("Connected to MongoDB");
    }
    return dbInstance;
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    throw err;
  } 
}

// Add a function to close the MongoDB connection
async function closeMongoDBConnection() {
    try {
      await client.close();
      //console.log("MongoDB connection closed");
    } catch (err) {
      console.error(`Error closing MongoDB connection: ${err}`);
    }
  }
  
module.exports = {
  connectToMongoDB,
  closeMongoDBConnection,
};
