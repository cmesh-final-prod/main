const mongoose = require('mongoose');

before(done => {
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', error));
});
//
// beforeEach(done => {
//   const { meshes } = mongoose.connection.collections;
//   try {
//     meshes
//       .drop()
//       .then(meshes.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
//       .then(() => done());
//   } catch (e) {}
// });
