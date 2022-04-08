const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

// create app
const app = express();

// middleware -> funcs that have access to the req & res objects and next()
// next() help us to end the req-res cycle avoiding leaving our req hanging
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// listen to port
app.listen(4000, () => {
  console.log('listening to request on port 4000!');
});
