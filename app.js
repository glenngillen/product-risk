var express = require('express')
    , url = require('url')
    , d3 = require('d3')
    , phantom = require('phantom')
    , temp = require('temp')
    , fs = require('fs')

var app = express();
app.get('/radar.png', function(req, res){
  var params = url.parse(req.url, true).query
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.open('./index.html', function(status) {
        if (status !== 'success') {
          console.log('FAIL to load the address');
          res.writeHead(500, {'Content-Type': 'image/png'});
          res.end();
        } else {
          page.renderBase64('PNG', function(data) {
            ph.exit();
            var buffer = new Buffer(data, 'base64');
            res.writeHead(200, {
              'Content-Type': 'image/png',
              'Content-Length': buffer.length
            });
            res.end(buffer);
          });
        }
      });
    })
  });

});

var port = process.env.PORT || 5000
app.listen(port);
console.log('Listening on port ' + port);
