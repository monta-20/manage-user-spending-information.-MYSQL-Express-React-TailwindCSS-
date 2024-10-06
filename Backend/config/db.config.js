'use strict';
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Database connection settings
const dbConn = mysql.createConnection({
    host: process.env.DB_HOST, // Use the host from .env
    user: process.env.DB_USER, // Use the user from .env
    password: process.env.DB_PASSWORD, // Use the password from .env
    database: process.env.DB_NAME // Use the database name from .env
});

// Connect to the database
dbConn.connect((err) => {
    if (err) throw err;
    console.log('Database connected successfully!');
});

module.exports = dbConn;
