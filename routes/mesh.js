// importing controllers
const fetchMeshesController = require('../controllers/fetchMeshes');
const fetchMeshUsersController = require('../controllers/fetchMeshUsers');
const addMeshUserController = require('../controllers/addMeshUser');
const exitMeshUserController = require('../controllers/exitMeshUser');
const createMeshController = require('../controllers/createMesh');
const fetchMeshOrganizerController = require('../controllers/fetchMeshOrganizer');

// importing middlewares
const isAuth = require('../middlewares/isAuth');

module.exports = app => {
  app.get('/api/meshes', fetchMeshesController);

  app.get('/api/meshes/:meshId', isAuth, fetchMeshUsersController);
  app.put('/api/meshes/:meshId/add/:userId', isAuth, addMeshUserController);
  app.put('/api/meshes/:meshId/exit/:userId', isAuth, exitMeshUserController);
  app.get(
    '/api/meshes/:meshId/organizer',
    isAuth,
    fetchMeshOrganizerController
  );

  // temp
  app.post('/api/meshes/:organizerId', createMeshController);
};
