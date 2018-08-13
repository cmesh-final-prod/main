const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
  userAgent: { type: Schema.Types.ObjectId, ref: 'UserAgent' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  fellowUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  meshId: { type: Schema.Types.ObjectId, ref: 'Mesh' },
  componentServed: String,
  logType: String,
  timestamp: Number
});

const Log = mongoose.model('Log', LogSchema);
module.exports = Log;
