const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./utils/uuid');
const notesDB = require('./db/db.json');

const PORT = 3001;
const app = express();

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
    res.json(notesDB);
});

// add note to db
app.post('/api/notes', (req, res) => {
    fs.writeFile(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify([...notesDB, { ...req.body, id: uuid() }], null, 2),
        (err) => {
            if (err) console.error(err);
            else console.log('Notes updated successfully.');
        });
    res.json(notesDB);
});

// delete note from db
app.delete('/api/notes/:id', (req, res) => {
    fs.writeFile(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify(notesDB.filter(note => note.id !== req.params.id), null, 2),
        (err) => {
            if (err) console.error(err);
            else console.log('Notes updated successfully.');
        });
    res.json(notesDB);
});


// start server
app.listen(PORT, (error) => {
    if (!error) console.log(`App listening on port ${PORT}`)
    else console.error('Error occurred, server failed to start', error);
});