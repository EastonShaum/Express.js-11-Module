const fs = require('fs');
const path = require('path');
const express = require('express');
const db = require('./db/db.json');

const uniqid = require('uniqid')


const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// This means that all of our front-end code can now be accessed without having a specific server endpoint created for it
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const notes = db
  console.log(notes)
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = uniqid()
  console.log(req.body)
  var newNote = req.body
  console.log('1', newNote)
  var noteDb = db.notes;
  noteDb.push(newNote)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: noteDb}, null, 2)
  );
  res.json(db);
});

app.delete('/api/notes:id', (req, res) => {
  
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
