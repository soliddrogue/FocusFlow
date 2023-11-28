const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema({
    username: String,
    email: String,
    password: String,
    price:String,
    date:Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Subscriptions = mongoose.model('Subscriptions', subSchema);

module.exports = Subscriptions;

