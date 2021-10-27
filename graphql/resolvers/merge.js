const DataLoader = require('dataloader');

const Booking = require('../../models/booking');
const User = require('../../models/user');
const ConfirmedBooking = require('../../models/confirmed');
const { dateToString } = require('../../helpers/date');

// must get a list of bookings, a single event, etc...
const bookingLoader = new DataLoader((bookingIds) => {
  return bookings(bookingIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const bookings = async bookingIds => {
  try {
    const bookings = await Booking.find({ _id: { $in: bookingIds } });
    bookings.sort((a, b) => {
      return bookingIds.indexOf(a._id.toString()) - bookingIds.indexOf(b._id.toString());
    })
    return bookings.map(transformBooking);
  } catch (err) {
    throw err;
  }
}

const singleBooking = async bookingId => {
  try {
    const booking = await bookingLoader.load(bookingId.toString());
    return booking;
  } catch (err) {
    throw err;
  }
}

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      // createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
}

const transformBooking = booking => {
  return {
    ...booking._doc,
    date: dateToString(booking._doc.date),
    // creator: user.bind(this, booking.creator)
  };
};

const transformConfirmedBooking = confirmedBooking => {
  return {
    ...confirmedBooking._doc,
    user: user.bind(this, confirmedBooking._doc.user),
    booking: singleBooking.bind(this, confirmedBooking._doc.booking),
    createdAt: dateToString(confirmedBooking._doc.createdAt),
    updatedAt: dateToString(confirmedBooking._doc.updatedAt)
  }
}

exports.transformBooking = transformBooking;
exports.transformConfirmedBooking = transformConfirmedBooking;
