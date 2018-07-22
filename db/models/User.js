const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const LinkedinSchema = require('../schema/Linkedin');
const TermsSchema = require('../schema/Terms');

const UserSchema = new Schema({
  linkedin: LinkedinSchema,
  meshes: [{ type: Schema.Types.ObjectId, ref: 'Mesh' }],
  createdAt: Number,
  termsOfUse: [TermsSchema]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
