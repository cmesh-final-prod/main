const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

const MeshUserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  active: { type: Boolean, default: true }
});

module.exports = MeshUserSchema;