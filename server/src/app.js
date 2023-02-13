const path = require('path');
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/v1/api');

const app = express();

// CORS
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Logger
app.use(morgan('combined'))

// JSON handler
app.use(express.json());

// Static files handler (Client code)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Versioning
app.use('/v1', api);

// * needed here to link React Router with Node Router
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;
