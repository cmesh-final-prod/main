const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

const meshSchema = new Schema({
  title: String,
  startTime: Date,
  endTime: Date,
  duration: { type: Number, default: 5 },
  _organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  _attendees: [String]
});

const Mesh = mongoose.model('meshes', meshSchema);

module.exports = Mesh;
