const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const LinkedinSchema = require('../schema/linkedin');

const userSchema = new Schema({
  linkedin: LinkedinSchema,
  meshes: [{ type: Schema.Types.ObjectId, ref: 'mesh' }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;
