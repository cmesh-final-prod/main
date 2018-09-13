const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/linkedin",
    passport.authenticate("linkedin"),
    (req, res) => {}
  );

  app.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
      successRedirect: "/mesh",
      failureRedirect: "/auth/linkedin"
    })
  );

  app.get(
    "/auth/meetup",
    (req, res, next) => {
      req.session.orgId = req.query.orgId;
      next();
    },
    passport.authenticate("meetup")
  );

  app.get(
    "/auth/meetup/callback",
    passport.authenticate("meetup", { failureRedirect: "/auth/meetup" }),
    function(req, res) {
      // Successul authentication, redirect home.
      res.redirect("/");
    }
  );
};
