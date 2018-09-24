const User = require("../../db/models/User");
const latestPolicyUpdateOn = require("../../utils/termsOfUse");

const createUser = async (profile, done) => {
  const existingUser = await User.findOne({
    "linkedin._id": profile.id
  });

  if (existingUser) {
    return done(null, { info: { id: existingUser.id, provider: "linkedin" } });
  }

  const emailsArray = await profile.emails.map(email => {
    return email.value;
  });

  const photosArray = await profile.photos.map(photo => {
    return photo.value;
  });

  const createdAt = new Date().getTime();

  const linkedin = {
    _id: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    emails: emailsArray,
    url: profile._json.siteStandardProfileRequest.url,
    photos: photosArray,
    headline: profile._json.headline,
    createdAt
  };

  const termsOfUse = {
    latestPolicyUpdateOn,
    accepted: true,
    acceptedAt: createdAt
  };

  const user = await User.create({
    linkedin,
    termsOfUse
  });

  return done(null, { info: { id: user.id, provider: "linkedin" } });
};

module.exports = createUser;
