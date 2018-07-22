const createOrganizerController = require('../controllers/createOrganizer');

module.exports = app => {
  app.post('/api/organizers', createOrganizerController);
};
