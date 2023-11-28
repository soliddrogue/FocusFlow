const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({

  content: String,
});

const Notes = mongoose.model('Note', noteSchema);

module.exports = Notes;