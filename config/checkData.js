// checking for scripts/etc edited into the team names

module.exports = function checkTeamNames(picks) {
    const NBATeams = ["Hawks","Celtics","Nets","Hornets","Bulls","Cavaliers","Mavericks","Nuggets","Pistons","Warriors",
    "Rockets","Pacers","Clippers","Lakers","Grizzlies","Heat","Bucks","Timberwolves","Pelicans","Knicks","Thunder",
    "Magic","76ers","Suns","Trail Blazers","Kings","Spurs","Raptors","Jazz","Wizards"]
    var pickArr = [];
    for (let i = 0; i < picks.west.length; i++){
        pickArr.push(picks.west[i])
    }
    pickArr.push(picks.champ)
    for (var i = 0; i < picks.east.length; i++){    // getting all picks into one array to simplify next step
        pickArr.push(picks.east[i])
    }
    for (var i = 0; i < pickArr.length; i++){
        var isTeam = false;
        for (j = 0; j < NBATeams.length; j++){
            if (pickArr[i] == NBATeams[j]){
                isTeam = true;
            }
        }
        if (!isTeam){
            return false;
        }
    }
    return true;
}