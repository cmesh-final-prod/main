/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////////            CircleMesh           /////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// setup
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Instantiating the express app
const app = express();

// App middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////
////////////           SETTING UP THE ROUTES       ///////////////
//////////////////////////////////////////////////////////////////

require('./routes/test')(app);

// Rendering Client Side App at Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// starting the PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
