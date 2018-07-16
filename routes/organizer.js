const OrganizersController = require('../controllers/organizer');

module.exports = app => {
  app.get('/api/organizers/:meshId', OrganizersController.fetchMeshOrganizer);
};
