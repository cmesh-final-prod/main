const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const LinkedinSchema = require('../schema/linkedin');
const AuthSchema = require('../schema/auth');
const OrgSchema = require('../schema/org');
const BookmarksSchema = require('../schema/bookmarks');

const organizerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  linkedin: LinkedinSchema,
  auth: AuthSchema,
  org: OrgSchema,
  meshes: [{ type: Schema.Types.ObjectId, ref: 'mesh' }],
  bookmarks: [BookmarksSchema]
});

const Organizer = mongoose.model('organizer', organizerSchema);

module.exports = Organizer;
