const mongoose = require('mongoose').set('debug', true);
const { Schema } = mongoose;

const GeoJSONSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

module.exports = GeoJSONSchema;
