const mongoose = require('mongoose');
const { Schema } = mongoose;

// Importing subdocuments
const DeviceSchema = require('../schema/Device');
const BrowserSchema = require('../schema/BrowserSchema');

const IpSchema = new Schema({
  _id: String,
  device: DeviceSchema,
  Browser: [BrowserSchema],
  firstVisitedAt: Number
});

const Ip = mongoose.model('Ip', IpSchema);

module.exports = Ip;
