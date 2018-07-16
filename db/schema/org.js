const mongoose = require('mongoose');
const { Schema } = mongoose;

const orgSchema = new Schema({
  name: { type: String, required: true },
  url: String,
  description: String
});

module.exports = orgSchema;
