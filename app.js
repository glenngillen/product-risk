var express = require('express')
    , url = require('url')
    , d3 = require('d3')
    , phantom = require('phantom')
    , temp = require('temp')

var app = express();
app.get('/radar.png', function(req, res){
  var params = url.parse(req.url, true).query
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.open('./index.html', function(status) {
        if (status !== 'success') {
          console.log('FAIL to load the address');
          res.end();
        } else {
          var filename = temp.path({suffix: '.png'});
          page.render(filename);
          console.log(filename)
          ph.exit();
          res.end();
          //res.send(pngImage)
        }
      });
    })
  });

});

var port = process.env.PORT || 5000
app.listen(port);
console.log('Listening on port ' + port);
