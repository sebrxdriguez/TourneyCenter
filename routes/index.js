const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const uri = require('../config/keys').mongoURI;
// Load User model
const User = require('../models/User');
const playoffResults = require('../models/playoffResults');
const getScore = require('../config/getScore');
const getPlacement = require('../config/getPlacement');
const playoffsStarted = (playoffResults.w1 != "")
const getTeams = require('../config/getTeams');
const bcrypt = require('bcryptjs')
const fs = require('fs')
const checkTeamNames = require('../config/checkData').checkTeamNames
const update = async (req) => {
  await User.updateOne({username: req.user.username}, {picks: req.body.picks, pickStyles: req.body.pickStyles})
}
const saveScore = async (req, score) => {
  await User.updateOne({username: req.user.username}, {scores: score.scores})
}
function renderBracket(req, res, teams) {    // gets passed into getTeams function
  res.render('dashboard', {
    user: req.user,
    west: teams.west, 
    east: teams.east
  })
}
router.get('/', ensureAuthenticated, (req, res) =>{
  if (playoffsStarted){
    var score = getScore(playoffs, req.user.picks);
    var placement = getPlacement(score.scores.total)
    saveScore(req, score)
    
    res.render('setBracket.ejs',{
      user: req.user,
      bracket: playoffs,
      score: score.scores,
      backgrounds: score.background
    })
  } else {
    getTeams(req, res, renderBracket)
  }
})
router.post('/', (req, res) => {
  const dataIsClean = checkTeamNames(req.body.picks)//checks if they changed the team names(w/ inspect element)
  if (dataIsClean){
    update(req)
  } else {
    console.log('unclean')
  }
})
router.get('/rules', ensureAuthenticated, (req, res) => {
  res.render('rules.ejs',{
    user: req.user
  })
})
router.get('/leaderboard', ensureAuthenticated, (req, res) => {
  res.render('leaderboard.ejs',{
    user: req.user,
  })
})
router.get('/groups', ensureAuthenticated, (req, res) => {
    res.render('groups.ejs', {
      user: req.user
    })
})
router.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account.ejs', {
    user: req.user
  })
})
// for creating and updating account
const newUserInfo = (req, res) => {
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
  } else {
    User.findOne({ username: username }).then(user => {
      if (user) {
        errors.push({ msg: 'Username is already in use' });
        if (!req.user){
          res.render('register', {
            errors,
            username,
            password,
            password2
          });
        }else {
          res.render('account.ejs', {
            errors, 
            username,
            password, 
            password2
          })
        }
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            if (!req.user){
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
            } else {
              User.updateOne({username: req.user.username}, {username: username, password: hash})
              req.flash(
                'success_msg',
                'Your account info has been changed.'
              );
              console.log(req.user)
              console.log(req.body)
              res.render('account.ejs', 
              password,
              {user: req.user})
            }
          })
        })
      }
    })
  }
}
// Change username or password
router.post('/account', (req, res) => {
  newUserInfo(req, res)
})

module.exports = {router, playoffResults, newUserInfo}