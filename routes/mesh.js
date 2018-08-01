// importing controllers
const fetchMeshesController = require('../controllers/GET/fetchMeshes');
const fetchMeshUsersController = require('../controllers/GET/fetchMeshUsers');
const addMeshUserController = require('../controllers/PUT/addMeshUser');
const exitMeshUserController = require('../controllers/PUT/exitMeshUser');
const createMeshController = require('../controllers/POST/createMesh');
const fetchMeshOrganizerController = require('../controllers/GET/fetchMeshOrganizer');

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
  app.post('/api/meshes/:organizerId', createMeshController);
};
