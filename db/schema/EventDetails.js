const mongoose = require("mongoose");
const { Schema } = mongoose;

// importing subdocuments
const Address = require("../../db/schema/Address");

const EventDetailsSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  address: Address
});

module.exports = EventDetailsSchema;
