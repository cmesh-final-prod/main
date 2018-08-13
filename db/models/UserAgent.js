const mongoose = require('mongoose');
const { Schema } = mongoose;

// Importing subdocuments
const DeviceSchema = require('../schema/Device');
const BrowserSchema = require('../schema/Browser');

const UserAgentSchema = new Schema({
  ip: String,
  device: DeviceSchema,
  browser: [BrowserSchema],
  firstVisitedAt: Number
});

const UserAgent = mongoose.model('UserAgent', UserAgentSchema);

module.exports = UserAgent;
