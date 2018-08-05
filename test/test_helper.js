const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(
    keys.mongoURI,
    { useNewUrlParser: true },
    err => {
      if (err) throw err;
      console.log(`Successfully connected to TEST database.`);
    }
  );
  mongoose.connection
    .once('open', () => {})
    .on('error', error => console.warn('Warning', error));

  done();
});
