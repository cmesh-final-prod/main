const mongoose = require('mongoose');
const { Schema } = mongoose;

const LinkedinSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  emails: [String],
  url: String,
  photos: [String],
  headline: String,
  createdAt: Number
});

module.exports = LinkedinSchema;
