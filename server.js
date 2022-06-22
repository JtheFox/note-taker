const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./utils/uuid');
const dbPath = path.join(__dirname, './db/db.json');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbOps = {
    read() { return JSON.parse(fs.readFileSync(dbPath)) },
    add(db, note) {
        try {
            fs.writeFileSync(dbPath, JSON.stringify([...db, { ...note, id: uuid() }], null, 2));
            return 'Successfully updated db';
        } catch {
            return new Error('Error writing to db');
        }
    }, 
    delete(db, id) {
        try {
            fs.writeFileSync(dbPath, JSON.stringify(db.filter(note => note.id !== id), null, 2));
            return 'Successfully updated db';
        } catch {
            return new Error('Error writing to db');
        }
    }
}

// landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// fetch notes from db
app.get('/api/notes', (req, res) => {
    res.json(dbOps.read());
});

// add note to db
app.post('/api/notes', (req, res) => {
    console.log(dbOps.add(dbOps.read(), req.body));
});

// delete note from db
app.delete('/api/notes/:id', (req, res) => {
    console.log(dbOps.delete(dbOps.read(), req.params.id));
});


// start server
app.listen(PORT, (error) => {
    if (!error) console.log(`App listening on port ${PORT}`)
    else console.error('Error occurred, server failed to start', error);
});