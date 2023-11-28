const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: String,
    password: String,
    calendarEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    creditCards: [{ type: Schema.Types.ObjectId, ref: 'CreditCard' }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'Subscription' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;