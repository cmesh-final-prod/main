const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

// subdocuments
const MeshUserSchema = require('../schema/MeshUser');
const GeoJSONSchema = require('../schema/GeoJSON');
const EventDetailsSchema = require('../schema/EventDetailsSchema');

const MeshSchema = new Schema({
  eventDetails: EventDetailsSchema,
  startDate: Date,
  endDate: Date,
  users: [MeshUserSchema],
  duration: Number,
  source: String,
  geometry: GeoJSONSchema,
  organizer: { type: Schema.Types.ObjectId, ref: 'Organizer' },
  createdAt: Number
});

MeshSchema.virtual('usersCount').get(function() {
  return this.users.length;
});

const Mesh = mongoose.model('Mesh', MeshSchema);

module.exports = Mesh;
