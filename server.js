const express = require('express');
const path = require('path');
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
//   res.json({
//     title: "",
//     text: ""

//   });
//   // res.sendFile(path.join(__dirname, 'notes.html'));
// });

// Receives new note to save on request body, adds it to `db.json` file, returns the new note to the client
// app.post('/api/notes', (req, res) => {
//   res.json({
    
//   });

// });

// Receives a query parameter containing id of note to delete, reads all notes in `db.json`, removes note with assigned `id`, rewrites notes to `db.json`
// app.delete('api/notes/:id', (req, res) => {
//   const selectedNote = req.params.id;

//   for (let i = 0; i < db.length; i++) {
//     if (selectedNote === db[i].id) {
//       // DELETE NOTE
//     }
//   }
  
//   res.json({
    
//   });

// });

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});