const express = require("express");

const app = express();

const port = 5000;

app.listen(port, function() {
  console.log("server started on port: " + port);
});

app.get('/', function(req, res) {
  res.send('hello..!!');
});