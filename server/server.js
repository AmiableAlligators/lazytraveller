const path = require('path');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const AppService = require('./AppService.js')
const data = require('./../data/sampleData');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/public'));

app.post('/query', function(req, res) {

  // AppService.find(req.body.where)
    // .then(data => {
    //   res.json(data);
    // })
    // .catch(error => {
    //   res.send(error);
    // })
  res.json(data);
});

// ««««««««« start app  »»»»»»»»»
app.listen(port, function() {
  console.log('Listening on port ', port);
});
