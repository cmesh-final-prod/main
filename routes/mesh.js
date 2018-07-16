const MeshController = require('../controllers/mesh');

// TODO: Create Protected Routes

module.exports = app => {
  // unprotected
  app.get('/api/meshes', MeshController.fetchMeshes);

  // protected
  app.post('/api/meshes/:organizerId', MeshController.createMesh);
  app.get('/api/meshes/:meshId', MeshController.fetchMeshUsers);
  app.put('/api/meshes/:meshId/add/:userId', MeshController.addMeshUser);
  app.put('/api/meshes/:meshId/exit/:userId', MeshController.exitMeshUser);
};
