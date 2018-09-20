const mongoose = require("mongoose");
const { Schema } = mongoose;

// importing subdocuments
const MeetupCategory = require("../../db/schema/MeetupCategory");

const MeetupSchema = new Schema({
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
