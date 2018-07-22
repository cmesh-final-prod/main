const fetchMeshesController = require('../controllers/fetchMeshes');
const fetchMeshUsersController = require('../controllers/fetchMeshUsers');
const addMeshUserController = require('../controllers/addMeshUser');
const exitMeshUserController = require('../controllers/exitMeshUser');
const createMeshController = require('../controllers/createMesh');
const fetchMeshOrganizerController = require('../controllers/fetchMeshOrganizer');

// TODO: Create Protected Routes

module.exports = app => {
  // unprotected
  app.get('/api/meshes', fetchMeshesController);

  // protected
  app.post('/api/meshes/:organizerId', createMeshController);
  app.get('/api/meshes/:meshId', fetchMeshUsersController);
  app.put('/api/meshes/:meshId/add/:userId', addMeshUserController);
  app.put('/api/meshes/:meshId/exit/:userId', exitMeshUserController);
  app.get('/api/meshes/:meshId/organizer', fetchMeshOrganizerController);
};
