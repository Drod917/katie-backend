const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type ConfirmedBooking {
    _id: ID!
    booking: Booking!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Booking {
    _id: ID!
    fullname: String!
    phone: String!
    date: String!
    service: String!
    comment: String!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    bookingHistory: [ConfirmedBooking!]
    confirmed: [ConfirmedBooking!]
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
  }

  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    bookings: [Booking!]!
    confirmedBookings: [ConfirmedBooking!]
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createUser(userInput: UserInput!): AuthData!
    createBooking(bookingInput: BookingInput!): Booking
    confirmBooking(bookingId: ID!): ConfirmedBooking!
    cancelBooking(bookingId: ID!): Booking!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
