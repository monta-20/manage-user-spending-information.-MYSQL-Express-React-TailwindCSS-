'use strict';
const Spending = require('../models/spending.model');
const { faker } = require('@faker-js/faker');
// Create a new spending record
exports.create = (req, res) => {
    const newSpending = new Spending(req.body);

    // Validate request
    if (!newSpending.userid || !newSpending.count || !newSpending.type || !newSpending.model) {
        return res.status(400).send({
            error: true,
            message: 'Please provide all required fields (userid, count, type, model).'
        });
    }

    Spending.create(newSpending, (err, spending) => {
        if (err) {
            return res.status(500).send({
                error: true,
                message: 'Could not create spending record.',
            });
        }
        res.json({
            error: false,
            message: 'Spending record created successfully!',
            data: spending
        });
    });
};

// Fetch all spending records with optional filters
exports.findAll = (req, res) => {
    const filters = {
        userid: req.query.userid,
        count:req.query.count,
        startdate: req.query.startdate,
        enddate: req.query.enddate,
        type: req.query.type,
        model: req.query.model
    };

    Spending.findAll(filters, (err, spendings) => {
        if (err) {
            return res.status(500).send({
                error: true,
                message: 'Could not fetch spending records.',
            });
        }
        res.json({
            error: false,
            message: 'Spendings fetched successfully!',
            data: spendings
        });
    });
};

// Update an existing spending record by id
exports.updateById = (req, res) => {
    const id = req.params.id; // Extract id from request params
    const updatedData = req.body; // Extract updated data from request body

    // Validate request
    if (!updatedData.userid || !updatedData.count || !updatedData.type || !updatedData.model) {
        return res.status(400).send({
            error: true,
            message: 'Please provide all required fields (userid, count, type, model).'
        });
    }

    Spending.updateById(id, updatedData, (err, spending) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    error: true,
                    message: `No spending record found with id: ${id}.`
                });
            }
            return res.status(500).send({
                error: true,
                message: 'Could not update spending record.',
            });
        }
        res.json({
            error: false,
            message: 'Spending record updated successfully!',
            data: spending
        });
    });
};


// Delete a spending record by id
exports.deleteById = (req, res) => {
    const id = req.params.id; // Extract id from request params

    Spending.deleteById(id, (err, result) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    error: true,
                    message: `No spending record found with id: ${id}.`
                });
            }
            return res.status(500).send({
                error: true,
                message: 'Could not delete spending record.',
            });
        } else {
            res.json({
                error: false,
                message: `Spending record with id: ${id} deleted successfully!`,
                data: result
            });
        }
    });
};

// Generate fake spending data
exports.generateFakeData = (req, res) => {
    const count = req.query.count || 10; // Number of records to generate, default to 10

    let fakeSpendings = [];

    for (let i = 0; i < count; i++) {
        let fakeSpending = {
            userid: faker.number.int({ min: 1, max: 100 }), // Random user ID
            count: faker.finance.amount(10, 5000, 2), // Random amount between 10 and 5000
            type: faker.commerce.department(), // Random department (e.g., Electronics, Clothing)
            model: faker.helpers.arrayElement(['Visa', 'Mastercard', 'American Express', 'Discover']), // Random credit card type
            createdat: faker.date.past(2) // Random date within the past 2 years
        };
        fakeSpendings.push(fakeSpending);
    }

    // Insert the generated fake data into the database
    Spending.bulkCreate(fakeSpendings, (err, result) => {
        if (err) {
            res.status(500).send({
                error: true,
                message: 'Error generating fake spending data'
            });
        } else {
            res.json({
                error: false,
                message: `Successfully generated ${count} fake spending records!`,
                data: fakeSpendings
            });
        }
    });
};