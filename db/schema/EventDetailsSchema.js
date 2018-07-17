const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventDetailsSchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  address: String
});

module.exports = eventDetailsSchema;
