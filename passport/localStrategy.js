const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');

const User          = require('../models/User.js');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  (username, password, done) => {
    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Username not in our DB' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect password' });
        return;
      }

      done(null, foundUser);
    })
    .catch(err => {console.log(err); done(err)});
  }
));

