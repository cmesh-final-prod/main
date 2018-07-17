const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

//// subdocuments
const meshUserSchema = require('../schema/meshUser');
const geoJSONSchema = require('../schema/geoJSON');
const eventDetailsSchema = require('../schema/eventDetailsSchema');

const MeshSchema = new Schema({
  eventDetails: eventDetailsSchema,
  startDate: Date,
  endDate: Date,
  users: [meshUserSchema],
  duration: Number,
  source: String,
  geometry: geoJSONSchema,
  organizer: { type: Schema.Types.ObjectId, ref: 'organizer' }
});

MeshSchema.virtual('usersCount').get(function() {
  return this.users.length;
});

const Mesh = mongoose.model('mesh', MeshSchema);

module.exports = Mesh;
