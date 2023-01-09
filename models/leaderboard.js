const User = require("./User")
const playoffResults = require('./playoffResults');
const getScore = require('../dataFunctions/getScore');
const getPlacement = require('../dataFunctions/getPlacement');
const playoffsStarted = (playoffResults.w1 != "")
const { MongoClient } = require('mongodb')
const uri = require('../config/keys').mongoURI;

module.exports = function (){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err;
        client.db("test").collection("users").find().toArray(function(err, result) {
            if (err) throw err;
            var leaderboard = []
            for (var i = 0; i < result.length; i++){
                leaderboard.push(result[i])
            }
            leaderboard.sort((a, b) => b.scores.total - a.scores.total)
            console.log(leaderboard)
            client.close();
            return result;
        })   
    });
}
