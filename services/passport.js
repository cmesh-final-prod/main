const keys = require('../config/keys');
const passport = require('passport');
const latestPolicyUpdateOn = require('../utils/termsOfUse');

// connesting with the db
const mongoose = require('mongoose').set('debug', true);
const User = require('../db/models/User');

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
      process.nextTick(async () => {
        const existingUser = await User.findOne({
          'linkedin.lnId': profile.id
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const emailsArray = await profile.emails.map(email => {
          return email.value;
        });

        const photosArray = await profile.photos.map(photo => {
          return photo.value;
        });

        const createdAt = new Date().getTime();

        const user = await User.create({
          createdAt,
          linkedin: {
            lnId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            emails: emailsArray,
            url: profile._json.siteStandardProfileRequest.url,
            photos: photosArray,
            headline: profile._json.headline
          },
          termsOfUse: {
            latestPolicyUpdateOn,
            accepted: true,
            acceptedAt: createdAt
          }
        });

        return done(null, user);
      });
    }
  )
);
