var express = require('express')
    , url = require('url')
    , d3 = require('d3')
    , phantom = require('phantom')
    , temp = require('temp')
    , fs = require('fs')
    , memjs = require('memjs')

var app = express();
var mc = memjs.Client.create();
var respondWithPNG = function(response, data) {
  var buffer = new Buffer(data, 'base64');
  response.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length
  });
  response.end(buffer);
};

app.get('/radar.png', function(req, res){
  var search = url.parse(req.url, true).search
  var params = url.parse(req.url, true).query
  mc.get(search, function(err, data, key) {
    if (data) {
      console.log('SUCCESS: Fetched from cache.');
      respondWithPNG(res, data);
    } else {
      phantom.create(function(ph) {
        ph.createPage(function(page) {
          page.open('./index.html'+search, function(status) {
            if (status !== 'success') {
              console.log('FAIL to load the address');
              res.writeHead(500, {'Content-Type': 'image/png'});
              res.end();
            } else {
              page.renderBase64('PNG', function(data) {
                ph.exit();
                mc.set(search, data, function(err, success) {
                  console.log('SUCCESS: Stored in cache.');
                  respondWithPNG(res, data);
                }, (60 * 60 * 24 * 30));
              });
            }
          });
        })
      });
    }
  });
});

var port = process.env.PORT || 5000
app.listen(port);
console.log('Listening on port ' + port);
