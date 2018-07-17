const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const LinkedinSchema = require('../schema/Linkedin');

const UserSchema = new Schema({
  linkedin: LinkedinSchema,
  meshes: [{ type: Schema.Types.ObjectId, ref: 'Mesh' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
