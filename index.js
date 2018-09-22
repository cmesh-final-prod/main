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
require("./services/orgAuth");

// seeding data
// require('./db/seeds');

// const jwt = require("./utils/jwt");
// console.log(jwt.encode("5ba2e864ad6b4035da04621a"));

const dateParser = require("./utils/dateParser");
const date = new Date();
const start = dateParser.subtractHours(date, 1);
const end = dateParser.addHours(date, 1);
const start1 = new Date(start);
const end1 = new Date(end);
console.log(
  date.toLocaleTimeString(),
  "--------MINUS 1",
  start1.toLocaleTimeString(),
  "---------PLUS 1",
  end1.toLocaleTimeString()
);

//////////////////////////////////////////////////////////////////
////////////             1. EXPRESS APP            ///////////////
//////////////////////////////////////////////////////////////////

const app = express();
require("./utils/cronJob");

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
