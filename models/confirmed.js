const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const confirmedBookingSchema = new Schema({
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ConfirmedBooking', confirmedBookingSchema);
