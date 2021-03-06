const keys = require("../config/keys");
const passport = require("passport");
const latestPolicyUpdateOn = require("../utils/termsOfUse");

// connecting with the db
const mongoose = require("mongoose");
const User = require("../db/models/User");

// importing controllers
const createUser = require("../controllers/POST/createUser");
const addMeetupAuth = require("../controllers/PUT/addMeetupAuth");

///////////////////////////////////////////////////////////////
///////////       Serializing-Deserializing         ///////////
///////////////////////////////////////////////////////////////

passport.serializeUser((user, done) => {
  console.log("------------USER: ", user);
  done(null, user.info);
});

passport.deserializeUser(async (info, done) => {
  switch (info.provider) {
    case "linkedin":
      const user = await User.findById(info.id);
      return done(null, user);
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
      scope: ["r_basicprofile", "r_emailaddress"],
      state: true,
      proxy: true
    },
    (acessToken, refreshToken, profile, done) => {
      console.log("----------LINKEDIN PROFILE: ", profile);
      process.nextTick(() => {
        createUser(profile, done);
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
      scope: ["event_management", "ageless"],
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        addMeetupAuth(req, accessToken, refreshToken, profile, done);
      });
    }
  )
);
