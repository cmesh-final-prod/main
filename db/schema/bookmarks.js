const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookmarksSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = BookmarksSchema;
