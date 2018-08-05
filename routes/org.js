const createOrg = require('../controllers/POST/createOrg');

module.exports = app => {
  app.post('/api/orgs', createOrg);
};
