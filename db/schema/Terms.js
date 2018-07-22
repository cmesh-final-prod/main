const mongoose = require('mongoose');
const { Schema } = mongoose;

const TermsSchema = new Schema({
  latestPolicyUpdateOn: Date,
  accepted: { type: Boolean, default: false },
  acceptedAt: Number
});

module.exports = TermsSchema;
