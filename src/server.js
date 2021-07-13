const express = require('express');
require('dotenv/config');

const db = require('./database')

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World!')
});

app.listen(3333, () => console.log("Server is running!"));