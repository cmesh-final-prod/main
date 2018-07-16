const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const meshUserSchema = require('../schema/meshUser');
const geoJSONSchema = require('../schema/geoJSON');

const meshSchema = new Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  duration: { type: Number, default: 5 },
  users: [meshUserSchema],
  geometry: geoJSONSchema,
  organizer: { type: Schema.Types.ObjectId, ref: 'organizer' }
});

const Mesh = mongoose.model('mesh', meshSchema);

module.exports = Mesh;
