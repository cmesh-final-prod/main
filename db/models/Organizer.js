const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const LinkedinSchema = require('../schema/Linkedin');
const AuthSchema = require('../schema/Auth');
const OrgSchema = require('../schema/Org');
const BookmarksSchema = require('../schema/Bookmarks');

const OrganizerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  linkedin: LinkedinSchema,
  auth: AuthSchema,
  org: OrgSchema,
  meshes: [{ type: Schema.Types.ObjectId, ref: 'mesh' }],
  bookmarks: [BookmarksSchema]
});

const Organizer = mongoose.model('Organizer', OrganizerSchema);

module.exports = Organizer;
