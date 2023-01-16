const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Load User model
const User = require('../models/User');
const playoffResults = require('../models/playoffResults');
const getScore = require('../dataFunctions/getScore');
const getPlacement = require('../dataFunctions/getPlacement');
const playoffsStarted = (playoffResults.w1 != "")
const getTeams = require('../dataFunctions/getTeams');
const checkTeamNames = require('../dataFunctions/checkData')
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
    var score = getScore(playoffResults, req.user.picks);
    var placement = getPlacement(score.scores.total)
    saveScore(req, score)
    res.render('setBracket.ejs',{
      user: req.user,
      bracket: playoffResults,
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
  // gets all user data and sorts it, adds html for each
  User.find({}).then(users => {
      var leaderboard = [];
      for (var i = 0; i < users.length; i++) {
        leaderboard.push(users[i]);
      }
      leaderboard.sort((a, b) => b.scores.total - a.scores.total)
      var frontEnd = "";
      for (var i = 0; i < leaderboard.length; i++) {
        frontEnd += "<li>" + leaderboard[i].username + " - "
        + leaderboard[i].scores.total + "</li>";
      }
      res.render('leaderboard.ejs',{
        user: req.user,
        leaderboard: frontEnd
      })
  })
})
router.get('/groups', ensureAuthenticated, (req, res) => {
    res.render('groups.ejs', {
      user: req.user
    })
})

module.exports = {router, playoffResults}