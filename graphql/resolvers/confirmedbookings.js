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
      const fetchedBooking = await Booking.findOne({ _id: bookingId });
      const confirmedBooking = new ConfirmedBooking({
        user: req.userId,
        booking: fetchedBooking,
      });
      const result = await confirmedBooking.save();

      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('User not found.');
      }
      user.confirmed.push(confirmedBooking);
      user.bookingHistory.push(confirmedBooking);
      await user.save();

      return transformConfirmedBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      //first get the event for which the booking is to be deleted
      const confirmedBooking = await ConfirmedBooking.findById(bookingId).populate('confirmedBooking');
      const booking = transformBooking(confirmedBooking.booking);

      //delete the booking
      await Booking.deleteOne({ _id: bookingId });

      //return the event from which the booking was deleted
      return booking;
    } catch (err) {
      throw err;
    }
  }
}
