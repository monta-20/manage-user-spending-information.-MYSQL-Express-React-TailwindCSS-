const express = require('express');
const router = express.Router();
const spendingController = require('../controllers/spending.controller');

// Create a new spending record
router.post('/spendings', spendingController.create);

// Get all spending records with optional filters
router.get('/spendings', spendingController.findAll);

// Update an existing spending record by id
router.put('/spendings/:id', spendingController.updateById);

// Delete a spending record by id
router.delete('/spendings/:id', spendingController.deleteById); // Changed from :userid to :id


// Generate fake spending data
router.post('/spendings/fake', spendingController.generateFakeData);


module.exports = router;
