const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  eventFeedback: Number,
  eventDescription: String,
  cmeshFeedback: Number,
  cmeshDescription: String,
  submittedAt: Number
});

module.exports = FeedbackSchema;
