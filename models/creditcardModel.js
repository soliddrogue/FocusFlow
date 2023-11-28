const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
    cardNumber: String,
    cardHolder: String,
    expirationMonth: Date,
    expirationYear: Date,
    cvv:String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  });
  
  const CreditCard = mongoose.model('CreditCard', creditCardSchema);

  
module.exports = CreditCard;