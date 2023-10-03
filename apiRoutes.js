// routes.js
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const connectToMongoDB = require('./db');

// Read all items
router.get('/', async (req, res) => {
    const db = await connectToMongoDB();
    try {
      const items = await db.collection('rests').find().toArray();
      res.json(items);
    } catch (error) {
      console.error('Error reading items:', error);
      res.status(500).json({ error: 'Error reading items' });
    }
  });

// Create a new item
router.post('/', async (req, res) => {
  const db = await connectToMongoDB();
  const newItem = req.body;
  try {
    const result = await db.collection('rests').insertOne(newItem);
    res.json(result);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Error creating item' });
  }
});

// Update an item by ID
router.put('/:id', async (req, res) => {
  const db = await connectToMongoDB();
  const itemId = req.params.id;
  const updatedItem = req.body;
  const objectId = new ObjectId(itemId);
  try {
    const result = await db.collection('rests').updateOne(
      { _id: objectId },
      { $set: updatedItem }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item updated successfully' });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Error updating item' });
  }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  const db = await connectToMongoDB();
  const itemId = req.params.id;
  const objectId = new ObjectId(itemId);
  try {
    const result = await db.collection('rests').deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item' });
  }
});

module.exports = router;
