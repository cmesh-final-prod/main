const mongoose = require('mongoose');

before(done => {
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', error));
});
