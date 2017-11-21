const express = require('express');

const router = express.Router();


router.get('/login', (req, res) => {
  res.render('users/login');
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
    res.send('passed');
  }
});


module.exports = router;
