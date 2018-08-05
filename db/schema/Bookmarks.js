const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarksSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'User' },
  meshId: { type: Schema.Types.ObjectId, ref: 'Mesh' }
});

module.exports = BookmarksSchema;
