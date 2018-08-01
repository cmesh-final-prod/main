const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserGeneratedInfo = new Schema({
  firstName: String,
  lastName: String,
  emails: [String],
  url: String,
  photos: [String],
  headline: String,
  hiring: { type: Boolean, default: false },
  lookingForJob: { type: Boolean, default: false }
});

module.exports = UserGeneratedInfo;
