const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// connect to mongoose
mongoose.connect('mongodb://localhost/video-dev', {
  useMongoClient: true,
}).then(() => { console.log('mongodb connected..!!'); }).catch(err => console.log(`error occured: ${err}`));


// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

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
