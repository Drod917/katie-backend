const User = require('../../models/user');
const Booking = require('../../models/booking');
const { transformBooking } = require('./merge');

module.exports = {
  bookings: async ({ _id, confirmed }) => {
    try {
      let bookings = [];
      if (_id) {
        let booking = await Booking.findById(_id);
        if (!booking) {
          throw new Error('Booking doesn\'t exist.');
        }
        return [transformBooking(booking)];
      }
      if (confirmed === true) {
        bookings = await Booking.find({ confirmed: true })
      }
      else if (confirmed === false) {
        bookings = await Booking.find({ confirmed: false });
      }
      else {
        bookings = await Booking.find();
      }

      return bookings.map(transformBooking);
    } catch(err) {
      throw err;
    }
  },
  createBooking: async ({ bookingInput: { fullname, phone, date, service, comment }}, req) => {
    const booking = new Booking({
      fullname: fullname,
      phone: phone,
      date: new Date(date),
      service: service,
      comment: comment,
      confirmed: false
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
