const path = require('path');
const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const AppService = require('./AppService.js')
const ShortlistResults = require('./db/ShortlistResults.js');
const Categories = require('./db/Categories.js');
const Activities = require('./db/Activities.js');
const distanceOptimization = require('./optimization/distance.js');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/public'));

app.post('/shortlist', function(req, res) {
  if (req.body.activity_id) {
    // TODO: Deal with Success or Error callback. 
    // Using var for non-block-scoped variable
    var shortlistPromise = ShortlistResults.shortlist(req.body);
  }
  if (req.body.completed) {
    if (shortlistPromise) {
      shortlistPromise.then(result => {
        ShortlistResults.getWithQueryId(req.body.query.id)
          .then(activities => {
            distanceOptimization(
              activities,
              req.body.limits.location.start,
              req.body.limits.location.end,
              req.body.query
            )
              .then(activities => {
                // 0-th item is an status object that the shortlisting is complete
                return res.json({
                  status: { complete: true },
                  activities: activities
                });
              })
          })
      });
    } else {
      ShortlistResults.getWithQueryId(req.body.query.id)
        .then(activities => {
          distanceOptimization(
            activities,
            req.body.limits.location.start,
            req.body.limits.location.end,
            req.body.query
          )
            .then(activities => {
              // 0-th item is an status object that the shortlisting is complete
              return res.json({
                status: { complete: true },
                activities: activities
              });
            })
        })
    }
  } else {
    // if not completed, send response
    res.status(201).send();
  }
});

/**
 * Main Query Route
 * @param  {Object}   req.body  contains:
 *     query: String user's input,
 *     filters: Array Categories.ids
 *     limits: {
 *       budget: String dollar signs E.g. $ or $$$,
 *       duration: String,
 *       location: {
 *         start: String or Object,
 *         end: String or Object (See below)
 *         // Note: If user got their location with GPS, this will be
 *         // an object with place, coords {lat: xxx, lon: xxx}
 *         // otherwise, if they typed their location in, it would be a String
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
  Categories.find().exec()
    .then(results => {
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
