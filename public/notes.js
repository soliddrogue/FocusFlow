// Get the notes container and the add note button from the DOM
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

// Populate the notes container with existing notes from localStorage
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

// Add event listener to the add note button
addNoteButton.addEventListener("click", () => addNote());

// Function to retrieve notes from localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Function to save notes to localStorage
function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Function to create a note element with specified id and content
function createNoteElement(id, content) {
  // Create a textarea element
  const element = document.createElement("textarea");

  // Add necessary classes and set values
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  // Add event listeners for change and double click events
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    // Ask for confirmation before deleting a note
    const doDelete = confirm("Are you sure you wish to delete this sticky note?");

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// Function to add a new note
function addNote() {
  // Retrieve existing notes
  const notes = getNotes();

  // Create a new note object
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  // Create a note element and insert it into the container
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  // Add the new note to the notes array and save it
  notes.push(noteObject);
  saveNotes(notes);
}

// Function to update the content of a note
function updateNote(id, newContent) {
  // Retrieve existing notes
  const notes = getNotes();

  // Find the target note and update its content
  const targetNote = notes.find((note) => note.id == id);
  if (targetNote) {
    targetNote.content = newContent;
    saveNotes(notes);
  }
}

// Function to delete a note
function deleteNote(id, element) {
  // Retrieve existing notes and filter out the target note
  const notes = getNotes().filter((note) => note.id != id);

  // Save the updated notes and remove the note element from the DOM
  saveNotes(notes);
  notesContainer.removeChild(element);
}