const dotenv = require('dotenv/config');
const express = require('express');
const cors = require('cors');
const db = require('./database');
const routes = require('./routes');

db();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;