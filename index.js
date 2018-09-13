/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////////            CircleMesh           /////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// setup
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const cors = require("cors");

// Establishing connection with mongo database
mongoose.connect(keys.mongoURI);

// Passport Strategy Stuff
const passport = require("passport");
require("./db/models/User");
require("./db/models/Mesh");
require("./db/models/Org");
require("./services/passport");

// seeding data
// require('./db/seeds');

// requesting meetup data
// ?access_token=96dfb74c21648ce8b805282355789b72
const request = require("request");
request(
  "https://api.meetup.com/San-Francisco-Networking-Meetup/events/",
  function(error, response, body) {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("Event: ", body); // Print the HTML for the Google homepage.
  }
);

//////////////////////////////////////////////////////////////////
////////////             1. EXPRESS APP            ///////////////
//////////////////////////////////////////////////////////////////

const app = express();

//////////////////////////////////////////////////////////////////
////////////             2. MIDDLEWARES            ///////////////
//////////////////////////////////////////////////////////////////

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 365 * 24 * 60 * 60 * 1000, //365 Days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//////////////////////////////////////////////////////////////////
////////////         3. SETTING UP THE ROUTES      ///////////////
//////////////////////////////////////////////////////////////////

require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/mesh")(app);
require("./routes/org")(app);
require("./routes/log")(app);

//////////////////////////////////////////////////////////////////
////////////            4. ERROR HANDLING          ///////////////
//////////////////////////////////////////////////////////////////

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
  next();
});

//////////////////////////////////////////////////////////////////
////////////      5. CLIENT APP AT PRODUCTION      ///////////////
//////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//////////////////////////////////////////////////////////////////
////////////                6. PORT                ///////////////
//////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 5001;
app.listen(PORT);

module.exports = app;
