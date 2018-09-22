const mongoose = require("mongoose");
const { Schema } = mongoose;

// importing subdocuments
const MeetupCategory = require("../../db/schema/MeetupCategory");
const MeetupGroupSummary = require("../../db/schema/MeetupGroupSummary");

const MeetupSchema = new Schema({
  summary: [MeetupGroupSummary],
  memberId: String,
  accessToken: String,
  refreshToken: String,
  urlName: String,
  groupId: String,
  category: MeetupCategory,
  memberCount: Number,
  url: String,
  createdAt: Number,
  tokenRefreshedAt: Number
});

module.exports = MeetupSchema;
