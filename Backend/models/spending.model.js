
'use strict';
const dbConn = require('../config/db.config');
// Spending object constructor
const Spending = function(spending) {
    this.id = spending.id;                  // Unique identifier for each spending record
    this.userid = spending.userid;          // Represents the user making the spending entry
    this.count = spending.count;            // Represents the amount of money spent
    this.createdat = new Date();            // When the spending record was created
    this.type = spending.type;              // The category/type of spending (e.g., "Food", "Entertainment")
    this.model = spending.model;            // The spending model (e.g., "Credit Card", "Cash")
};

// Create a new spending record
Spending.create = (newSpending, result) => {
    dbConn.query("INSERT INTO spendings SET ?", newSpending, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Created spending: ", { id: res.insertId, ...newSpending });
            result(null, { id: res.insertId, ...newSpending });
        }
    });
};

// Fetch all spendings with filters
Spending.findAll = (filters, result) => {
    let query = "SELECT * FROM spendings WHERE 1=1";

    // Apply filters dynamically
    if (filters.userid) query += ` AND userid = ${filters.userid}`;
    if (filters.count) query += ` AND count = '${filters.count}'`;
    if (filters.startdate && filters.enddate) query += ` AND createdat BETWEEN '${filters.startdate}' AND '${filters.enddate}'`;
    if (filters.type) query += ` AND type = '${filters.type}'`;
    if (filters.model) query += ` AND model = '${filters.model}'`;

    dbConn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Update an existing spending record by id
Spending.updateById = function(id, spending, result) {
    const query = `UPDATE spendings SET userid=? ,count=?, type=?, model=? WHERE id = ?`;
    
    dbConn.query(query, [spending.userid, spending.count, spending.type, spending.model, id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            // Check if any rows were affected
            if (res.affectedRows === 0) {
                // No spending record found with the provided id
                result({ kind: "not_found" }, null);
            } else {
                console.log("Updated spending: ", { id: id, ...spending });
                result(null, { id: id, ...spending });
            }
        }
    });
};

// Delete a spending record by id
Spending.deleteById = (id, result) => {
    dbConn.query("DELETE FROM spendings WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                // No spending record found
                result({ kind: "not_found" }, null);
            } else {
                console.log("Deleted spending with id: ", id);
                result(null, res);
            }
        }
    });
};


Spending.bulkCreate = (spendingData, result) => {
    const values = spendingData.map(spending => [
        spending.userid,
        spending.count,
        spending.type,
        spending.model,
        spending.createdat
    ]);

    const query = `
        INSERT INTO spendings (userid, count, type, model, createdat) 
        VALUES ?
    `;

    dbConn.query(query, [values], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Inserted fake spending records: ", res.affectedRows);
            result(null, res);
        }
    });
};
module.exports = Spending;
