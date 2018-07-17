const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/linkedin',
    passport.authenticate('linkedin'),
    (req, res) => {}
  );

  app.get(
    '/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      successRedirect: '/mesh',
      failureRedirect: '/auth/linkedin'
    })
  );

  app.get('/api/current_user', (req, res, next) => {
    try {
      res.send(req.user);
    } catch (e) {
      next(e);
    }
  });
};