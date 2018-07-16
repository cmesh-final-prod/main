const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = authSchema;
