const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: Number },
  email: { type: String },
  appointments: [Schema.Types.ObjectId],
  tier: {type: String, enum: ['VIP', 'A', 'B'] } 
})

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
