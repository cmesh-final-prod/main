const passport = require('passport');

module.exports = app => {
  app.get('/auth/linkedin', passport.authenticate('linkedin'), (req, res) => {
    res.send({ hi: 'from auth/linkedin' });
  });

  app.get(
    '/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      successRedirect: '/',
      failureRedirect: '/auth/linkedin'
    })
  );

  app.get('/auth/current_user', (req, res) => {
    res.send(req.user);
  });
};
