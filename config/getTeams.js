const {MongoClient} = require('mongodb');
const uri = require('./keys').mongoURI;

module.exports = 
    async function (req, res, renderBracket) {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            var collection = client.db("test").collection("public");
            var year = new Date().getFullYear().toString();
            // finds the current year's playoff teams in database
            await collection.findOne({year: year}).then(playoffTeams => {
                renderBracket(req, res, playoffTeams);
                client.close();
            })
        } catch (err) {
            console.log(err)
        }
    }