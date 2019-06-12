const passport = require("passport");
const User = require("../models/User.js");

passport.serializeUser((loggedInUser, done) => {
  done(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, done) => {
  User.findById(userIdFromSession)
    .then(userDocument => {
      done(null, userDocument);
    })
    .catch(err => {
      done(err);
    });
});

