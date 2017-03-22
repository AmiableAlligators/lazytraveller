const path = require('path');
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const AppService = require('./AppService.js');
const data = require('./../data/sampleData');
const Categories = require('./db/categories.js');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/public'));

app.post('/query', function(req, res) {
	let queryWithFilters = req.body;
  AppService.find(queryWithFilters)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.send(error);
    })
});

// ««««««««« start app  »»»»»»»»»
app.listen(port, function() {
  console.log('Listening on port ', port);
});
