const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// creating User Schema
const userSchema = new Schema({
  linkedinID: { type: String, unique: true },
  linkedinFirstName: String,
  linkedinLastName: String,
  linkedinEmails: [String],
  linkedinURL: String,
  linkedinProfilePictures: [String],
  linkedinHeadline: String
});

// creating user model
const User = mongoose.model('users', userSchema);
module.exports = User;
