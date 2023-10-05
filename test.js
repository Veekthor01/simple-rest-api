//* This is unit testing, it does not interact with the database. It uses mock data to test the functions.
const express = require('express');
const supertest = require('supertest');
const app = express();
const apiRouter = require('./apiRoutes');

// Mock the database functions to prevent actual database interactions during testing.
const { connectToMongoDB, closeMongoDBConnection } = require('./db');
connectToMongoDB.mockResolvedValue(/* mock database connection */);
closeMongoDBConnection.mockResolvedValue(/* mock database connection closure */);

// Create a supertest agent for making HTTP requests to the app.
const request = supertest(app);

// Use the apiRouter for testing.
app.use('/api/crud', apiRouter);

// Mock the database module to provide mock functions.
jest.mock('./db', () => ({
    connectToMongoDB: jest.fn(),
    closeMongoDBConnection: jest.fn(),
  }));

// Test suite for API Routes.
describe('API Routes', () => {
  // Test case: Get all items.
  it('should get all items', async () => {
    // Mock the database query for getting all items.
    const mockItems = {"name": 'test', "age": 20, "occupation": 'student'};
    const dbInstance = {
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValue(mockItems),
    };
    connectToMongoDB.mockResolvedValue(dbInstance);

    const response = await request.get('/api/crud');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItems);
  });

  // Test case: Create a new item.
  it("should create a new item", async () => {
    const mockItem = {"name": 'test', "age": 20, "occupation": 'student'};
    const dbInstance = {
      collection: jest.fn().mockReturnThis(),
      insertOne: jest.fn().mockResolvedValue(mockItem),
    };
    connectToMongoDB.mockResolvedValue(dbInstance);
    const response = await request.post("/api/crud").send(mockItem);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItem);
  });

  // Test case: Update an item.
  it("should update an item", async () => {
    const mockItem = {"name": 'test', "age": 20, "occupation": 'student'};
    const dbInstance = {
      collection: jest.fn().mockReturnThis(),
      updateOne: jest.fn().mockResolvedValue(mockItem),
    };
    connectToMongoDB.mockResolvedValue(dbInstance);
    const response = await request.put("/api/crud/651b1858427c99dee06c9a3f").send(mockItem);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item updated successfully');
  });

  // Test case: Delete an item.
  it("should delete an item", async () => {
    const mockItem = {"name": 'test', "age": 20, "occupation": 'student'};
    const dbInstance = {
      collection: jest.fn().mockReturnThis(),
      deleteOne: jest.fn().mockResolvedValue(mockItem),
    };
    connectToMongoDB.mockResolvedValue(dbInstance);
    const response = await request.delete("/api/crud/651b189f427c99dee06c9a40");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item deleted successfully');
  });
});

//*This is integration testing, it interacts directly with the database. It uses real data to test the functions.
/*
const request = require("supertest");
const app = require('./app');
const { connectToMongoDB, closeMongoDBConnection } = require('./db');

// Set up before and after hooks for database connections.
beforeAll(async () => {
    // Establish a connection to the MongoDB database before running tests.
    await connectToMongoDB();
});

afterAll(async () => {
    // Close the MongoDB connection after all tests have completed.
    await closeMongoDBConnection();
});

// Describe a suite of tests for API routes.
describe("API Routes", () => {
    // Test case: Read all items.
    it("should read all items", async() => {
        // Send an HTTP GET request to retrieve all items from the API.
        const response = await request(app).get("/api/crud");
        // Expectations for the HTTP response.
        expect(response.statusCode).toBe(200); // Expect a successful status code (200 OK).
        expect(response.body).toBeInstanceOf(Array); // Expect the response body to be an Array.
    }); 

    // Test case: Create an item.
    it("should create an item", async() => {
        // Define a new item to be created.
        const newItem = {
            name: 'Test item',
            age: 20,
            occupation: 'student',
        };
        // Send an HTTP POST request to create a new item.
        const response = await request(app).post('/api/crud').send(newItem);
        // Expectations for the HTTP response.
        expect(response.status).toBe(200); // Expect a successful status code (200 OK).
        expect(response.body).toBeInstanceOf(Object); // Expect the response body to be an Object.
    });

    // Test case: Update an item.
    it("should update an item", async() => {
        // Send an HTTP PUT request to update an item (assuming 'newItem' is defined).
        const response = await request(app).put("/api/crud").send(newItem);
        // Expectations for the HTTP response.
        expect(response.statusCode).toBe(200); // Expect a successful status code (200 OK).
        expect(response.body).toHaveProperty('message', 'Item updated successfully'); // Expect a specific response message.
    }); 

    // Test case: Delete an item.
    it("should delete an item", async() => {
        // Send an HTTP DELETE request to delete an item.
        const response = await request(app).delete("/api/crud");
        // Expectations for the HTTP response.
        expect(response.statusCode).toBe(200); // Expect a successful status code (200 OK).
        expect(response.body).toHaveProperty('message', 'Item deleted successfully'); // Expect a specific response message.
    });
});
*/ 