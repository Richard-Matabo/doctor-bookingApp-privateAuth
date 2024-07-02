const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
