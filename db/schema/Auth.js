const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const AuthSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  timestamp: Number
});

module.exports = AuthSchema;
