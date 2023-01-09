const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fs = require('fs')
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];
  if (!username || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (username.search(/[\'\"\[\]\@\s\?\/\$\%\*\(\)]/) > -1){
    errors.push({msg: 'Username contains prohibited characters'})
  }
  const file = fs.readFileSync("./bannedWords.txt", "utf-8")
  const list = file.split(/\r?\n/)
  for (var i = 0; i < list.length; i++){
    if (username.search(list[i]) > -1){
      errors.push({msg: 'Username contains explicit language'})
      break;
    }
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      username,
      password,
      password2
    });
  } 
  User.findOne({ username: username }).then(user => {
    if (user) {
      errors.push({ msg: 'Username is already in use' });
      res.render('register', {
        errors,
        username,
        password,
        password2
      });
    } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
          const newUser = new User({
            username,
            password
          });
          newUser.password = hash;
          newUser.save()
          .then(user => {
            req.flash(
              'success_msg',
              'You are now registered and can log in'
            );
            res.redirect('/users/login');
          })
          .catch(err => console.log(err));
        })
      })
    }
  })
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err)
    }
  })
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;