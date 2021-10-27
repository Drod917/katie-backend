const ConfirmedBooking = require('../../models/confirmed');
const Booking = require('../../models/booking');
const User = require('../../models/user');
const { transformBooking, transformConfirmedBooking } = require('./merge');

module.exports = {
  confirmedBookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const bookings = await ConfirmedBooking.find({ user: req.userId });
      return bookings.map(booking => {
        return transformConfirmedBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  confirmBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        throw new Error('Booking doesn\'t exist');
      }
      if (booking.confirmed) {
        throw new Error('Booking already confirmed.')
      }

      booking.confirmed = true;

      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('User not found.');
      }
      booking.user = user;
      user.confirmedBookings.push(booking);
      user.bookingHistory.push(booking);
      await user.save();
      const result = await booking.save();

      return transformConfirmedBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelConfirmedBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        throw new Error('Booking doesn\'t exist.');
      }
      if (booking.confirmed == false) {
        throw new Error('Booking not confirmed yet.');
      }
      booking.confirmed = false;
      booking.save();

      // return the canceled booking information
      return transformBooking(booking);
    } catch (err) {
      throw err;
    }
  },
  deleteBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        throw new Error('Booking doesn\'t exist.');
      }
      
      // delete the booking
      await Booking.deleteOne({ _id: bookingId });

      // return the deleted booking information
      return transformBooking(booking);
    } catch (err) {
      throw err;
    }
  }
}
