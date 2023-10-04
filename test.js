const request = require("supertest");
const app = require('./app');
const { connectToMongoDB, closeMongoDBConnection } = require('./db');

beforeAll(async () => {
    await connectToMongoDB();
});

afterAll(async () => {
    await closeMongoDBConnection();
});

describe("API Routes", () => {
   

    it("should read all items", async() => {
        const response = await request(app).get("/api/crud");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }); 

    it("should create an item", async() => {
        const newItem = {
            name: 'Test item',
            description: 'A test item'
          };
          const response = await request(app).post('/api/crud').send(newItem);
          expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should update an item", async() => {
        const response = await request(app).put("/api/crud").send(newItem);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Item updated successfully');
    }); 

    it("should delete an item", async() => {
        const response = await request(app).delete("/api/crud");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Item deleted successfully');
    });
});