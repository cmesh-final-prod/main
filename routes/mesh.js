// importing controllers
const fetchMeshes = require('../controllers/GET/fetchMeshes');
const fetchMeshUsers = require('../controllers/GET/fetchMeshUsers');
const addMeshUser = require('../controllers/PUT/addMeshUser');
const exitMeshUser = require('../controllers/PUT/exitMeshUser');
const createMesh = require('../controllers/POST/createMesh');
const addMeshFeedback = require('../controllers/PUT/addMeshFeedback');

// importing middlewares
const isAuth = require('../middlewares/isAuth');

// TODO: Add isAuth middleware back to protected routes

module.exports = app => {
  app.get('/api/meshes', fetchMeshes);
  app.get('/api/meshes/:meshId', fetchMeshUsers);
  app.post('/api/meshes/:orgId', createMesh);
  app.put('/api/meshes/:meshId/add/:userId', addMeshUser);
  app.put('/api/meshes/:meshId/exit/:userId', isAuth, exitMeshUser);
  app.put('/api/meshes/:meshId/feedback/:userId', addMeshFeedback);
};
