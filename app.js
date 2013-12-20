var express = require('express');
var app = express();
var d3 = require("d3");

app.get('/', function(req, res){
  var body = 'Hello World';
  res.send(body);
});

var port = process.env.PORT || 5000
app.listen(port);
console.log('Listening on port ' + port);
