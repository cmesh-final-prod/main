const mongoose = require("mongoose");
const { Schema } = mongoose;

const MeetupCategory = new Schema({
  _id: Number,
  name: String,
  metaCategoryId: Number,
  metaCategoryName: String
});

module.exports = MeetupCategory;
