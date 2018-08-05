const keys = require('../config/keys');
const passport = require('passport');
const latestPolicyUpdateOn = require('../utils/termsOfUse');

// connecting with the db
const mongoose = require('mongoose');
const User = require('../db/models/User');

// importing controllers
const createUserController = require('../controllers/POST/createUser');

///////////////////////////////////////////////////////////////
///////////       Serializing-Deserializing         ///////////
///////////////////////////////////////////////////////////////

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

///////////////////////////////////////////////////////////////
///////////            Linkedin OAuth               ///////////
////////////////////////////////////////////////////////////////

const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(
  new LinkedinStrategy(
    {
      clientID: keys.linkedinClientId,
      clientSecret: keys.linkedinClientSecret,
      callbackURL: keys.linkedinCallbackURL,
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true,
      proxy: true
    },
    (acessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        createUserController(profile, done);
      });
    }
  )
);
