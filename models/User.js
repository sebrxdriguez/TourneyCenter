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
    required: false
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