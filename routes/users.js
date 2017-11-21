const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

// Load user model
require('../models/User');

const User = mongoose.model('users');

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

router.get('/register', (req, res) => {
  res.render('users/register');
});

// user registration
router.post('/register', (req, res) => {
  const errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({
      text: 'passwords do not match!!',
    });
  }
  if (req.body.password.length < 4) {
    errors.push({
      text: 'passwords must be atleast 4 chars!',
    });
  }
  if (errors.length > 0) {
    res.render('users/register', {
      errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  } else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          req.flash('error_msg', 'email already taken!!');
          res.redirect('/users/login');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
              if (error) { console.log(error); }
              newUser.password = hash;
              newUser.save()
                .then((user) => {
                  req.flash('success_msg', 'you are now registered and can login');
                  res.redirect('/users/login');
                });
            });
          });
        }
      });
  }
});


module.exports = router;
