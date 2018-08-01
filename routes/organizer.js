const createOrganizerController = require('../controllers/POST/createOrganizer');

module.exports = app => {
  app.post('/api/organizers', createOrganizerController);
};
