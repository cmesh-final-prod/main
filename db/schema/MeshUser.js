const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

const MeshUserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'user' },
  active: { type: Boolean, default: true },
  joinedAt: Number,
  exitedAt: Number
});

module.exports = MeshUserSchema;
