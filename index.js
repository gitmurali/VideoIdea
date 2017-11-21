const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ideas = require('./routes/ideas');
const users = require('./routes/users');

const app = express();

// map global promise
mongoose.Promise = global.Promise;

// connect to mongoose
mongoose.connect('mongodb://localhost/video-dev', {
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

// Method override middleware..
app.use(methodOverride('_method'));

// Express session middleware..
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;

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
