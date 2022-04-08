const express = require('express');

// create app
const app = express();

// listen to port
app.listen(4000, () => {
  console.log('listening to request on port 4000!');
});
