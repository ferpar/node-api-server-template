const express = require('express');
const axios = require('axios');
const passport = require('passport');

const router = express.Router();
const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup', (req, res) => {
  const { 
    username, 
    password,
    phone = null,
    email = null
  } = req.body;

  if (!username || !password) {
      res.status(400).json({ message: "Please provide both username and password" });
      return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad,"});
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one."});
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);

    newUser = new User({
      username,
      password: hashPass,
      phone,
      email
    });

    newUser.save( err =>{
      if (err) {
        res
          .status(400)
          .json({ message: "Error saving user to database"});
        return;
      }
    
      req.login( newUser, err => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error logging in after sign-up"});
          return;
        }
      });

      res.status(200).json(newUser);
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, foundUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'error during authentication process'});
      return;
    }

    if (!foundUser) {
      //"failureDetails" contains the error messages
      // from our logic in "localStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    //save user in session ( via req.login )
    req.login(foundUser, err => {
      if (err) {
        res.status(500).json({ message: 'Error saving session'});
        return;
      };

      res.status(200).json(foundUser)
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()){
  req.logout();
  res.status(200).json({ message: 'Log out success!'});
  } else {
  res.status(403).json({ message: 'Already logged out'});
  }
});

router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Authentication required"});
});

module.exports = router;
