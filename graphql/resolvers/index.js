const authResolver = require('./auth');
const bookingResolver = require('./booking');
const confirmedBookingResolver = require('./confirmedbookings');

const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...confirmedBookingResolver
};

module.exports = rootResolver;
