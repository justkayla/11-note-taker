const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));


// Returns the `index.html` file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Returns the `notes.html` file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Reads the `db.json` file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(db));

// Receives new note to save on request body, adds it to `db.json` file, returns the new note to the client
app.post('/api/notes', (req, res) => {
  console.log(req.body);
  res.send("Received");

  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      id: uuid(),
      title,
      text  
    };

    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);

    // Append the data to the `db.json` file
    fs.appendFile(`./db/db.json`, noteString, (err) =>
      err ? console.log(err) : console.log('Note has been added to JSON file')    
    );
    // Want to append data to db, saved array already, use functions that are away of structured data

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
  }
});

// Receives a query parameter containing id of note to delete, reads all notes in `db.json`, removes note with assigned `id`, rewrites notes to `db.json`
app.delete('api/notes/:id', (req, res) => {
//   const selectedNote = req.params.id;

//   for (let i = 0; i < db.length; i++) {
//     if (selectedNote === db[i].id) {
//       // DELETE NOTE
//     }
//   }
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});