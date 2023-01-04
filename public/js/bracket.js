const eastGameNames = ["e5", "e6", "e7", "fi"];
const westGameNames = ["w5", "w6", "w7", "fi"];
var elements = document.getElementsByClassName("inputs");
var  initPicks= [];
for (var i = 0; i < elements.length; i++){
    initPicks[i] = elements[i].textContent.substring(1)
}
var initSeeds = [];
for (var i = 0; i < elements.length; i++){
    initSeeds[i] = elements[i].textContent.substring(0,1)
}
var westPicks= [initPicks[4], initPicks[5], initPicks[23], initPicks[24],initPicks[12], initPicks[13], initPicks[14]];
var eastPicks= [initPicks[6], initPicks[7], initPicks[26], initPicks[27],initPicks[16], initPicks[17], initPicks[15]];
var wSeeds = [initSeeds[4], initSeeds[5], initSeeds[23], initSeeds[24], initSeeds[12], initSeeds[13], initSeeds[14]];
var eSeeds = [initSeeds[6], initSeeds[7], initSeeds[26], initSeeds[27], initSeeds[16], initSeeds[17], initSeeds[15]];
var champPick = document.getElementById("x5").textContent;

function win (winID, lossID, newID, game){
    // makes sure element clicked actually has a team in it already and isnt a repeat pick
    var winningElement = document.getElementById(winID)
    if (winningElement.textContent.length > 3 && document.getElementById(newID).textContent != winningElement.textContent){
        // helps radio system stay coordinated
        var num = Math.floor(game / 2) + (game % 2) - 1
        // finds instances of the losing team in future rounds and deletes them
        for (var i = 0; i < 32; i++){
            if (parseInt(elements[i].id.substring(1,2)) > parseInt(lossID.substring(1,2)) 
            && (elements[i].textContent === document.getElementById(lossID).textContent || 
            elements[i].textContent === document.getElementById(lossID).textContent.substring(1))){
                document.getElementById(elements[i].id).innerHTML = "<hr>";
            }
        }
        // finds out if its an east or west game
        if (winID.substring(0,1) == "w") {
            if (game != 8){
                westPicks[game-1] = winningElement.textContent.substring(1);
                wSeeds[game-1] = winningElement.textContent.substring(0,1);
            }
            var newName = westGameNames[num]
        } else  if (winID.substring(0,1) == "e"){
            if (game != 8){
                eastPicks[game-1] = winningElement.textContent.substring(1);
                eSeeds[game-1] = winningElement.textContent.substring(0,1);
            }
            var newName = eastGameNames[num]
        }
        if (newID == 'x5'){
            champPick = winningElement.textContent.substring(1);
            document.getElementById("x5").innerHTML= "<label>"+winningElement.textContent.substring(1)+"</label>";
        } else {
            // line below moves the entire html line to the next round so that they can click on that one too
            document.getElementById(newID).innerHTML = winningElement.innerHTML.substring(0, 32) + winningElement.textContent.substring(1) + 
            "<input class='radios' name='" + newName + "' type='radio'></label>";
        }
        const btn = document.getElementById('save');
        btn.textContent = "Save";
        btn.style.setProperty("--save-bg", "rgb(78, 165, 194)");
        btn.style.setProperty("--save-hover-bg", "rgb(43, 131, 160)");
        document.body.style.setProperty("--saveCursor", "pointer");
    }
}
function postSave (){
    for (var i = 0; i < 32; i++){
        if (elements[i].textContent == ""){
            return alert("Please fill out the entire bracket");
        }
    }
    const pickStyles = [];
    // gets the radio info
    for (var i = 0; i < 32; i++){
        // cant iterate through the non-team elements in grid
        if (elements[i].id != "x5" && elements[i].id != "save"){
            const name = elements[i].innerHTML.substring(elements[i].innerHTML.indexOf("name=")+6, elements[i].innerHTML.indexOf("name=")+8)
            const gameNum1 = parseInt(elements[i].id.substring(1,2))
            var checked = "";
            // to figure out if the team advances, then adds "checked" to radio
            for (var j = 0; j < 32; j++){
                if (elements[j].id != "save"){
                    const gameNum2 = parseInt(elements[j].id.substring(1,2))
                    if (gameNum2 > gameNum1 && elements[i].textContent.search(elements[j].textContent) > -1){
                        checked =  "checked"
                        break;
                    }
                }
            }
            pickStyles.push("<input class='radios' name='" + name + "' type='radio'" + checked + ">");
        }
    }
    const btn = document.getElementById('save');
    btn.textContent = "Saved";
    btn.style.setProperty("--save-bg", "rgb(200, 200, 200)");
    btn.style.setProperty("--save-hover-bg", "rgb(200, 200, 200)");
    document.body.style.setProperty("--saveCursor", "default");
    $.ajax({
        type: 'POST', 
        url: '/',
        dataType: 'json',
        data: {
            picks: {
                west: westPicks,
                wSeeds: wSeeds,
                east: eastPicks,
                eSeeds: eSeeds,
                champ: champPick,
            },
            pickStyles: pickStyles
        }, 
        error : function (err) {
            console.log(err)
            alert("Something went wrong")
        }
    })
}