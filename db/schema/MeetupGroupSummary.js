const mongoose = require("mongoose");
const { Schema } = mongoose;

const MeetupGroupSummary = new Schema({
  groupId: String,
  name: String,
  urlName: String,
  role: String
});

module.exports = MeetupGroupSummary;
