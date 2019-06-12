const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  time: { type:Date, required: true },
  duration: { type: Number, default: 30 },
  customer: { type: Schema.Types.ObjectId, default: null },
  service: { type: String, default: null }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
