const mongoose = require("mongoose");
const { Schema } = mongoose;

const MeetupSchema = new Schema({
  _id: String
});

module.exports = MeetupSchema;
