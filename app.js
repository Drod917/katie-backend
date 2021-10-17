const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const schema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

console.log(process.env.MONGODB_USER);
console.log(process.env.MONGODB_PASSWORD);
console.log(process.env.MONGODB_NAME);

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.iniwj.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority
    `
  )
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
