"use strict"

const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// set the GET route for the root
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

// set listener
const port = 8000;
app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});
