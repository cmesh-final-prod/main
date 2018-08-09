const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrowserSchema = new Schema({
  browserName: String,
  browserVersion: String,
  timestamp: Number
});

module.exports = BrowserSchema;
