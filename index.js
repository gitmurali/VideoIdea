const express = require("express");
const exphbs = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const port = 5000;

app.listen(port, function() {
  console.log("server started on port: " + port);
});

app.get('/', function(req, res) {
  res.send('hello..!!');
});