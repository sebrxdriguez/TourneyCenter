const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  picks: {
    type: Object,
    default: {
      west: ['<hr>', '<hr>','<hr>', '<hr>','<hr>', '<hr>','<hr>'],
      wSeeds: ['', '', '', '', '', '', '', ''],
      east: ['<hr>', '<hr>','<hr>', '<hr>','<hr>', '<hr>','<hr>'], 
      eSeeds: ['', '', '', '', '', '', '', ''],
      champ: '<hr>'
    }
  },
  scores: {
    type: Object, 
    default: {   
      wr1: 0,
      wr2: 0,
      wr3: 0, 
      er1: 0,
      er2: 0,
      er3: 0,
      finals: 0,
      total: 0
    }
  },
  pickStyles: {
    type: Array,
    default: [
      "<input class='radios'name='w1'type='radio'>",
      "<input class='radios'name='w1'type='radio'>",
      "<input class='radios'name='e1'type='radio'>",
      "<input class='radios'name='e1'type='radio'>",
      "",
      "",
      "",
      "",
      "<input class='radios'name='w2'type='radio'>",
      "<input class='radios'name='w2'type='radio'>",
      "<input class='radios'name='e2'type='radio'>",
      "<input class='radios'name='e2'type='radio'>",
      "",
      "",
      "",
      "",
      "",
      "",
      "<input class='radios'name='w3'type='radio'>",
      "<input class='radios'name='w3'type='radio'>",
      "<input class='radios'name='e3'type='radio'>",
      "<input class='radios'name='e3'type='radio'>",
      "",
      "",
      "",
      "",
      "<input class='radios'name='w4'type='radio'>",
      "<input class='radios'name='w4'type='radio'>",
      "<input class='radios'name='e4'type='radio'>",
      "<input class='radios'name='e4'type='radio'>"
    ]
  }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;