const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  confirmed: {
    type: Boolean,
    required: true
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
