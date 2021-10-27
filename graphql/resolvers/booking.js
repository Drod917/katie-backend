const User = require('../../models/user');
const Booking = require('../../models/booking');
const { transformBooking } = require('./merge');

module.exports = {
  bookings: async ({ freeOnly }) => {
    try {
      let bookings = [];
      // if (freeOnly) {
      //   events = await Event.find().where('price').equals(0);
      // } else {
      //   events = await Event.find();
      // }
      bookings = await Booking.find();

      return bookings.map(transformBooking);
    } catch(err) {
      throw err;
    }
  },
  createBooking: async ({ bookingInput: { fullname, phone, date, service, comment }}, req) => {
    // Remove authentication to create events
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }

    const booking = new Booking({
      fullname: fullname,
      phone: phone,
      date: new Date(date),
      service: service,
      comment: comment
      // creator: req.userId,
    });

    try {
      let createdBooking;
      const result = await booking.save();
      createdBooking = transformBooking(result);

      return createdBooking;
    } catch(err) {
      console.log(err);
      throw err;
    }
  },
}
