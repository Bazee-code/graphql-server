const express = require('express');
const { graphqlHTTP } = require('express-graphql');

// create app
const app = express();

// middleware -> funcs that have access to the req & res objects and next()
// next() help us to end the req-res cycle avoiding leaving our req hanging
app.use('/graphql', graphqlHTTP({}));

// listen to port
app.listen(4000, () => {
  console.log('listening to request on port 4000!');
});
