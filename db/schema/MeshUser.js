const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const FeedbackSchema = require('./Feedback');

const MeshUserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'user' },
  active: { type: Boolean, default: true },
  joinedAt: Number,
  exitedAt: Number,
  feedback: FeedbackSchema
});

module.exports = MeshUserSchema;
