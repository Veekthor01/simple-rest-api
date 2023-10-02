const express = require("express");
const router = express.Router();

// GET /crud
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const data = await db.collection('rests').find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /crud
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const newData = req.body;
    const result = await db.collection('rests').insertOne(newData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /crud/:id
router.put('/:id', async (req, res) => {
    try {
      const db = req.app.locals.db;
      const updatedData = await db.collection('rests').updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
  
      if (updatedData.modifiedCount === 0) {
        throw new Error('Data not found');
      }
  
      res.json({ message: 'Data updated successfully' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
  
  // DELETE /crud/:id
  router.delete('/:id', async (req, res) => {
    try {
      const db = req.app.locals.db;
      const deletedData = await db.collection('rests').deleteOne({ _id: req.params.id });
  
      if (deletedData.deletedCount === 0) {
        throw new Error('Data not found');
      }
  
      res.json({ message: 'Data deleted successfully' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
  

module.exports = router;
