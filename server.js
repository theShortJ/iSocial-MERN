'use strict'

const express = require('express');
const connectDB = require('./config/db');
const config = require('config');
const path = require('path');

// Adding Redis Cache Impl to cache the Query results returned by MongoDB.
require('./hooks/RedisCache');

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

// Setting up Prerender to use in Heroku
if ( process.env.PRERENDER_TOKEN && process.env.PRERENDER_SERVICE_URL) {
    console.log(" ############## Using prerender on Heroku ############## ");
    app.use(require('prerender-node').set('prerenderServiceUrl', process.env.PRERENDER_SERVICE_URL).set('prerenderToken', process.env.PRERENDER_TOKEN));
    console.log(" ############## Using prerender on Heroku ############## ");
} else {
    // Setting up Prerender to run locally
    app.use(require('prerender-node').set('prerenderServiceUrl',config.get('prerenderServiceUrl')).set('prerenderToken', config.get('prerenderToken')));
    console.log(` ######### Using prerender server on ${config.get('prerenderServiceUrl')} ######### `);
}

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
app.listen(port, () => console.log(`Node server started on port ${port}`));
