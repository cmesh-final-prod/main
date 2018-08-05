const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserInfo = new Schema({
  firstName: String,
  lastName: String,
  emails: [String],
  url: String,
  photos: [{ type: String, default: null }],
  headline: String,
  hiring: { type: Boolean, default: false },
  lookingForJob: { type: Boolean, default: false }
});

module.exports = UserInfo;
