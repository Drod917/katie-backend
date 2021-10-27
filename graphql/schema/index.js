const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Booking {
    _id: ID!
    fullname: String!
    phone: String!
    date: String!
    service: String!
    comment: String!
    createdAt: String!
    updatedAt: String!
    confirmed: Boolean
    user: User
  }

  type User {
    _id: ID!
    email: String!
    password: String
    bookingHistory: [Booking!]
    confirmedBookings: [Booking!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    email: String!
  }

  input BookingInput {
    fullname: String!
    phone: String!
    date: String!
    service: String!
    comment: String!
    confirmed: Boolean
  }

  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    bookings(_id: ID, confirmed: Boolean): [Booking!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createUser(userInput: UserInput!): AuthData!
    createBooking(bookingInput: BookingInput!): Booking
    confirmBooking(bookingId: ID!): Booking!
    cancelConfirmedBooking(bookingId: ID!): Booking!
    deleteBooking(bookingId: ID!): Booking!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
