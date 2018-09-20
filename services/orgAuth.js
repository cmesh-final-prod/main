const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

// importing models
const Org = require("../db/models/Org");

///////////////////////////////////////////////////////////////
///////////       JWT AUTHENTICATE STRATEGY         ///////////
///////////////////////////////////////////////////////////////

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.jwtKey
};

const jwtAutenticate = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    console.log("----------------is org auth");
    const org = await Org.findOne({ _id: payload.sub });

    if (org) {
      done(null, org);
    } else {
      done(null, false);
    }
  } catch (e) {
    done(e, false);
  }
});

passport.use(jwtAutenticate);

///////////////////////////////////////////////////////////////
///////////            SIGN IN STRATEGY             ///////////
///////////////////////////////////////////////////////////////

const localOptions = { usernameField: "email" };

const localSignin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const existingOrg = await Org.findOne({ "auth.email": email });
      if (!existingOrg) {
        return done(null, false);
      } else {
        existingOrg.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (!isMatch) {
            return done(null, false);
          }
          return done(null, existingOrg);
        });
      }
    } catch (e) {
      done(e, false);
    }
  }
);

passport.use(localSignin);
