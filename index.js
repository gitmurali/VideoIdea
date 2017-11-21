const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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

// load idea model
require('./models/Idea');

const Idea = mongoose.model('ideas');

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

app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({ date: 'desc' })
    .then((ideas) => {
      res.render('ideas/index', {
        ideas,
      });
    });
});

app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => {
    res.render('ideas/edit', {
      idea,
    });
  });
});

app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => {
    // new values
    const videoIdea = idea;
    videoIdea.title = req.body.title;
    videoIdea.details = req.body.details;

    videoIdea.save()
      .then((idea) => {
        res.redirect('/ideas');
      });
  });
});

app.delete('/ideas/:id', (req, res) => {
  Idea.remove({
    _id: req.params.id,
  }).then(() => {
    res.redirect('/ideas');
  });
});

app.post('/ideas', (req, res) => {
  const errors = [];

  if (!req.body.title) {
    errors.push({ text: 'please add a title' });
  }
  if (!req.body.details) {
    errors.push({ text: 'please add some details' });
  }
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
    };
    new Idea(newUser)
      .save()
      .then((idea) => {
        res.redirect('/ideas');
      });
  }
});

