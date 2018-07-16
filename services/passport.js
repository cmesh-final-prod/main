const keys = require('../config/keys');
const passport = require('passport');

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
        const existingUser = await User.findOne({ linkedinID: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const emailsArray = profile.emails.map(email => {
          return email.value;
        });

        const photosArray = profile.photos.map(photo => {
          return photo.value;
        });

        const user = await User.create({
          linkedin: {
            lnId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            emails: emailsArray,
            url: profile._json.siteStandardProfileRequest.url,
            photos: photosArray,
            headline: profile._json.headline
          }
        });

        // const user = await new User({
        //   linkedinID: profile.id,
        //   linkedinEmails: emailsArray,
        //   linkedinFirstName: profile.name.givenName,
        //   linkedinLastName: profile.name.familyName,
        //   linkedinURL: profile._json.siteStandardProfileRequest.url,
        //   linkedinProfilePictures: photosArray,
        //   linkedinHeadline: profile._json.headline
        // }).save();

        return done(null, user);
      });
    }
  )
);
