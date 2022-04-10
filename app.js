const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

let dbURI =
  'mongodb+srv://eugene:mypassword@cluster0.ezzbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// create app
const app = express();

// allow cors
app.use(cors());

// connect to db
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(4000, () => {
      console.log('listening to request on port 4000!');
    });
  })
  .catch((e) => {
    console.log(e);
  });

// middleware -> funcs that have access to the req & res objects and next()
// next() help us to end the req-res cycle avoiding leaving our req hanging
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
