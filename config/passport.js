const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = mongoose.model('users');

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'No user found' }); }
      // match password
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) throw error;
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: 'password incorrect' });
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
