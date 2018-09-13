const keys = require("../config/keys");
const passport = require("passport");
const latestPolicyUpdateOn = require("../utils/termsOfUse");

// connecting with the db
const mongoose = require("mongoose");
const User = require("../db/models/User");

// importing controllers
const createUserController = require("../controllers/POST/createUser");
const addMeetupAuthController = require("../controllers/PUT/addMeetupAuth");

///////////////////////////////////////////////////////////////
///////////       Serializing-Deserializing         ///////////
///////////////////////////////////////////////////////////////

passport.serializeUser((user, done) => {
  done(null, user.info);
});

passport.deserializeUser((info, done) => {
  switch (info.provider) {
    case "linkedin":
      return User.findById(id).then(user => {
        done(null, user);
      });
    case "meetup":
      return done(null, info);
    default:
      return done(null, info);
  }
});

///////////////////////////////////////////////////////////////
///////////            Linkedin OAuth               ///////////
////////////////////////////////////////////////////////////////

const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new LinkedinStrategy(
    {
      clientID: keys.linkedinClientId,
      clientSecret: keys.linkedinClientSecret,
      callbackURL: keys.linkedinCallbackURL,
      scope: ["r_emailaddress", "r_basicprofile"],
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

///////////////////////////////////////////////////////////////
///////////            Meetup OAuth               /////////////
///////////////////////////////////////////////////////////////

const MeetupStrategy = require("passport-oauth2-meetup").Strategy;

passport.use(
  new MeetupStrategy(
    {
      clientID: keys.meetupClientId,
      clientSecret: keys.meetupClientSecret,
      callbackURL: keys.meetupCallbackURL,
      autoGenerateUsername: true,
      state: true,
      proxy: true,
      scope: ["event_management", "group_edit", "group_content_edit"],
      passReqToCallback: true
    },
    (req, acessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        addMeetupAuthController(req, profile, done);
      });
    }
  )
);
