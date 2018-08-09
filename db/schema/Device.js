const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema({
  isMobile: Boolean,
  model: String,
  os: String,
  osVersion: String,
  ua: String,
  vendor: String
});

module.exports = DeviceSchema;
