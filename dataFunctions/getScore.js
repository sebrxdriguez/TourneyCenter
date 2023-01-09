module.exports = function getScore(playoffs, picks){
    var wround1pts = 0;
    var wround2pts = 0;
    var wround3pts = 0;
    var eround1pts = 0;
    var eround2pts = 0; 
    var eround3pts = 0; 
    var finalsPts = 0;
    var totalScore = 0;
    var backgrounds = {
        w1: 'rgb(230, 230, 230)',
        w2: 'rgb(230, 230, 230)',
        w3: 'rgb(230, 230, 230)',
        w4: 'rgb(230, 230, 230)',
        w5: 'rgb(230, 230, 230)',
        w6: 'rgb(230, 230, 230)',
        w7: 'rgb(230, 230, 230)',
        e1: 'rgb(230, 230, 230)',
        e2: 'rgb(230, 230, 230)',
        e3: 'rgb(230, 230, 230)',
        e4: 'rgb(230, 230, 230)',
        e5: 'rgb(230, 230, 230)',
        e6: 'rgb(230, 230, 230)',
        e7: 'rgb(230, 230, 230)',
        champPick: 'rgb(230, 230, 230)',
    };
    if (playoffs.w1 == picks.w1){
      wround1pts += 10;
        backgrounds.w1 = `<style>#${picks.w1id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.w1 = `<style>#${picks.w1id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.w2 == picks.w2){
      wround1pts += 10;
      backgrounds.w2 = `<style>#${picks.w2id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.w2 = `<style>#${picks.w2id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.w3 == picks.w3){
      wround1pts += 10;
      backgrounds.w3 = `<style>#${picks.w3id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.w3 = `<style>#${picks.w3id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.w4 == picks.w4){
      wround1pts += 10;
      backgrounds.w4 = `<style>#${picks.w4id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.w4 = `<style>#${picks.w4id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.e1 == picks.e1){
      eround1pts += 10;
      backgrounds.e1 = `<style>#${picks.e1id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.e1 = `<style>#${picks.e1id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.e2 == picks.e2){
      eround1pts += 10;
      backgrounds.e2 = `<style>#${picks.e2id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.e2 = `<style>#${picks.e2id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.e3 == picks.e3){
      eround1pts += 10;
      backgrounds.e3 = `<style>#${picks.e3id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.e3 = `<style>#${picks.e3id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.e4 == picks.e4){
      eround1pts += 10;
      backgrounds.e4 = `<style>#${picks.e4id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.e4 = `<style>#${picks.e4id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.w5 == picks.w5){
        wround2pts += 20;
        backgrounds.w5 = `<style>#${picks.w5id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.w5 = `<style>#${picks.w5id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.w6 == picks.w6){
        wround2pts += 20;
        backgrounds.w6 = `<style>#${picks.w6id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.w6 = `<style>#${picks.w6id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.e5 == picks.e5){
        eround2pts += 20;
        backgrounds.e5 = `<style>#${picks.e5id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.e5 = `<style>#${picks.e5id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.e6 == picks.e6){
        eround2pts += 20;
        backgrounds.e6 = `<style>#${picks.e6id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.e6 = `<style>#${picks.e6id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.w7 == picks.w7){
        wround3pts += 30;
        backgrounds.w7 = `<style>#${picks.w7id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.w7 = `<style>#${picks.w7id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.e7 == picks.e7){
        eround3pts += 30;
        backgrounds.e7 = `<style>#${picks.e7id} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.e7 = `<style>#${picks.e7id} {background: rgba(255, 0, 0, .35);}</style>`;
    }if (playoffs.champPick == picks.champPick){
        finalsPts += 40;
        backgrounds.champPick = `<style>#championPick {background: rgba(0, 255, 0, .35);}</style>`;
        backgrounds.finals = `<style>#${picks.champPickID} {background: rgba(0, 255, 0, .35);}</style>`;
    }else {
        backgrounds.champPick = `<style>#championPick {background: rgba(255, 0, 0, .35);}</style>`;
        backgrounds.finals = `<style>#${picks.champPickID} {background: rgba(255, 0, 0, .35);}</style>`;
    }
    totalScore = wround1pts + wround2pts + wround3pts + eround1pts + eround2pts + eround3pts + finalsPts;
    return {
        scores: {
            wr1: wround1pts,
            wr2: wround2pts,
            wr3: wround3pts,
            er1: eround1pts,
            er2: eround2pts,
            er3: eround3pts,
            finals: finalsPts,
            total: totalScore
        },
        background: backgrounds
    }
}