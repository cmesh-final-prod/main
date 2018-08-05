const mongoose = require('mongoose');
const { Schema } = mongoose;

// subdocuments
const AuthSchema = require('../schema/Auth');
const BookmarksSchema = require('../schema/Bookmarks');
const TermsSchema = require('../schema/Terms');

const OrgSchema = new Schema({
  title: { type: String, required: true },
  url: String,
  description: String,
  auth: AuthSchema,
  primaryOrganizerId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [BookmarksSchema],
  createdAt: Number,
  termsOfUse: [TermsSchema]
});

const Org = mongoose.model('Org', OrgSchema);

module.exports = Org;
