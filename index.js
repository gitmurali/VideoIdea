const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const ideas = require('./routes/ideas');
const users = require('./routes/users');
const db = require('./config/database');

const app = express();


// map global promise
mongoose.Promise = global.Promise;


// connect to mongoose
mongoose.connect(db.mongoURI, {
  useMongoClient: true,
}).then(() => {
  console.log('mongodb connected..!!');
})
  .catch(err => console.log(`error occured: ${err}`));


// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static folder
app.use(express.static(path.join(__dirname, 'public')));


// Method override middleware..
app.use(methodOverride('_method'));

// Express session middleware..
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// use routes
app.use('/ideas', ideas);
app.use('/users', users);


// Passport config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome',
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
