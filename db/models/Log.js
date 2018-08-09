const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
  ip: { Type: String, ref: 'Ip' }
});

const Log = mongoose.model('Log', LogSchema);
module.exports = Log;
