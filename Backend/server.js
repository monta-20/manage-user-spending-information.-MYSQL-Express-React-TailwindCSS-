// server.js

const express = require('express');
const app = express();

const spendingRoute = require('./routes/spending.route'); // Add spending route
require('dotenv').config();

// CORS configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all domains or specific domain
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
    next();
});

const port = process.env.PORT || 3300; // Set default port if not defined
app.use(express.json()); // Send or receive data to client/server
app.use(express.urlencoded({ extended: true })); // Receive data from FORM


app.use('/', spendingRoute); // Add spending route



app.listen(port, () => console.log(`Listening on PORT ${port}`));
