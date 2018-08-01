const User = require('../../db/models/User');
const latestPolicyUpdateOn = require('../../utils/termsOfUse');

const createLinkedinUser = async (profile, done) => {
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
};

module.exports = createLinkedinUser;
