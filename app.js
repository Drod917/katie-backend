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

// Disable authentication requirement to post events (web form submission enable)
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
  process.env.MONGODB_URI
)
.then(() => {
  app.listen(process.env.PORT);
})
.catch(err => {
  console.log(err);
});