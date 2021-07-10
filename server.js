const fs = require('fs');
const path = require('path');
const express = require('express');
const { db } = require('./Develop/db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// This means that all of our front-end code can now be accessed without having a specific server endpoint created for it
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(db);
  //res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});



app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });
