const mongoose = require('mongoose').set('debug', false);
const { Schema } = mongoose;

// subdocuments
const TermsSchema = require('../schema/Terms');
const UserInfoSchema = require('../schema/UserInfo');
const BookmarksSchema = require('../schema/Bookmarks');
const LinkedinSchema = require('../schema/Linkedin');
const AuthSchema = require('../schema/Auth');

const UserSchema = new Schema({
  userInfo: UserInfoSchema,
  linkedin: LinkedinSchema,
  auth: AuthSchema,
  meshes: [{ type: Schema.Types.ObjectId, ref: 'Mesh' }],
  termsOfUse: [TermsSchema],
  bookmarks: [BookmarksSchema],
  orgId: [{ type: Schema.Types.ObjectId, ref: 'Org' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
