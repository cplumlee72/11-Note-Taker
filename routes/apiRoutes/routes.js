const { db } = require("../../db/db.json");
const router = require("express").Router();
const fs = require("fs");
//npm package to create a random unique id
const { v4: uuidv4 } = require("uuid");

//get notes from db.json if there are any
const savedNotes = fs.readFileSync("./db/db.json", "UTF-8");
if (savedNotes) {
  let oldNotes = JSON.parse(savedNotes);
  notes = oldNotes;
} else {
  notes = [];
}

//gets all notes from the db
router.get("/notes", (req, res) => {
  return res.json(notes);
});

//collect user input data, store it and write it to the page
router.post("/notes", function (req, res) {
  //assign a random ID
  let noteId = uuidv4();
  //structures the newNote object
  let newNote = {
    id: noteId,
    title: req.body.title,
    text: req.body.text,
  };
  //collect the data and push it into db.json
  console.log(newNote);
  notes.push(newNote);
  //send the data back to the client and use writefs to show the user the new note
  res.json(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (
    err
  ) {
    if (err) throw err;
  });
});

//Delete a note from the notes array based on its unique ID
router.delete("/notes/:id", (req, res) => {
  //find the id of the note that is going to be deleted
  let deleteNote = notes.findIndex((item) => item.id === req.params.id);
  //remove the note from the notes array
  notes.splice(deleteNote, 1);

  //write the updated array to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (
    err
  ) {
    if (err) throw err;
  });
  res.json({ message: "Note Deleted!" });
});

module.exports = router;