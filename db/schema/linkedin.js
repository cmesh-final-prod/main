const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

const linkedinSchema = new Schema({
  lnId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  emails: [String],
  url: String,
  photos: [String],
  headline: String
});

module.exports = linkedinSchema;
