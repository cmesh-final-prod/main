const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrgSchema = new Schema({
  name: { type: String, required: true },
  url: String,
  description: String
});

module.exports = OrgSchema;
