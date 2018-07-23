const passport = require('passport');

// importing middlewares
const isAuth = require('../middlewares/isAuth');

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

  app.get('/api/current_user', isAuth, (req, res, next) => {
    try {
      res.send({ isAuth: true, isCompliant: true, user: req.user });
    } catch (e) {
      next(e);
    }
  });
};
