const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  });
  
  const Event = mongoose.model('Event', eventSchema);

  
module.exports = Event;