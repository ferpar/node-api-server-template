const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  phone: {type: Number, default: null},
  email: {type: String, default: null},
  appointments: [{type: Schema.Types.ObjectId, ref: "Appointment"}],
  tier: {type: String, enum: ['VIP', 'A', 'B'], default:  'B'},
  role: {type: String, enum: ['Admin', 'Employee', 'Customer'], default: 'Customer'}

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
