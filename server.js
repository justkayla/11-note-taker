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
  res.send("Received");

  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const note = {
      id: uuid(),
      title,
      text  
    };

    // Retrieve what data is already in `db.json`, assign it
    let noteData = fs.readFileSync('./db/db.json');
    // Parse the data from `db.json`, assign it
    let noteArray = JSON.parse(noteData);
    // push changes to array
    noteArray.push(note)
    
    // Append the data to the `db.json` file  
    let newNote = JSON.stringify(noteArray);
    fs.writeFileSync('./db/db.json', newNote);
  
    const response = {
    status: 'success',
    body: note,
    };
    console.log(response);  
  };
  // How to return note immediately upon saving/adding?
  // What is the `+` versus `save` feature? Temp add versus store? How to handle?
  return note;     
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