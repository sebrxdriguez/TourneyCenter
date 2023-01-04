const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const uri = require('./config/keys').mongoURI;
mongoose
  .connect(
    uri,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


  // static file config
  app.use(express.static('public'))
  app.use('/css', express.static(path.join(__dirname, 'public/css')))
  app.use('/js', express.static(path.join(__dirname, 'public/js')))
  app.use('/img', express.static(path.join(__dirname, 'public/img')))

// views
app.use(expressLayouts)
app.set('view engine', 'ejs'); 

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js').router);
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3005;
app.listen(PORT, console.log(`Server running on  ${PORT}`));