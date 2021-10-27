const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmedBookings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ConfirmedBooking'
    }
  ],
  bookingHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ConfirmedBooking'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
