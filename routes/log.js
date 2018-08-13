const createLog = require('../controllers/POST/createLog');

module.exports = app => {
  app.post('/api/logs', createLog);
};
