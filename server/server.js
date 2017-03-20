const path = require('path');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const data = require('./../data/sampleData');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/public'));

app.post('/query', function(req, res) {
  // AppService.fetch(req.body)
    // .then(function(data) {
    //   res.json(data);
    // })
    // .error(function(error) {
    //   res.send(error);
    // })
  res.json(data);
});

// ««««««««« start app  »»»»»»»»»
app.listen(port, function() {
  console.log('Listening on port ', port);
});
