const path = require('path');
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const AppService = require('./AppService.js')
const ShortlistResults = require('./db/ShortlistResults.js');
const Categories = require('./db/Categories.js');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/public'));

app.post('/shortlist', function(req, res) {
    ShortlistResults.insertShortlist(req.body);
    res.send();
});

/**
 * Main Query Route
 * @param  {Object}   req.body  contains:
 *     {
 *       query: String user's input,
 *       filters: Array Categories.ids
 *       limits: {
 *         budget: String dollar signs E.g. $ or $$$,
 *         duration: String,
 *         location: {
 *           start: String or Object,
 *           end: String or Object (See below)
 *           // Note: If user got their location with GPS, this will be
 *           // an object with place, coords {lat: xxx, lon: xxx}
 *           // otherwise, if they typed their location in, it would be a String
 *         }
 *       }
 *     }
 */
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

app.get('/categories', function(req, res) {
  let categories = Categories.find().exec();
  categories.then(results => {
    res.json(results);
  })
    .catch(error => {
      res.send(error);
    })
});

// ««««««««« start app  »»»»»»»»»
app.listen(port, function() {
  console.log('Listening on port ', port);
});
