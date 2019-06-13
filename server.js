'use strict'

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();

// Connect to Database
connectDB();

// Initialize Middleware for Body Parser
app.use(express.json(
    {
        extended: false
    }
));

// Define Routes : Starts
// app.get('/', (req, res) => res.send('Home Page'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
// Define Routes : Ends

// Serve static assets in Production
if ( process.env.NODE_ENV === 'production' ) {
    // Set static folder to servre static content
    app.use(express.static('client/build'));
    // All request apart from the routes configured above
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Server startup
app.listen(port, () => console.log(`Server started on port ${port}`));
