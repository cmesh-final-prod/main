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
};
