const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// notes patch
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// fetch notes from db
app.get('/api/notes', (req, res) => {

});

// add notes to db
app.post('/api/notes', (req, res) => {

});

// start server
app.listen(PORT, (error) => {
    if (!error) console.log(`App listening on port ${PORT}`)
    else console.error('Error occurred, server can\'t start', error);
});