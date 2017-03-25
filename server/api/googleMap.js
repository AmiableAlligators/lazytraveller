const Promise = require('bluebird');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY;
});

const distanceMatrix = Promise.promisify(googleMapsClient.distanceMatrix);

module.exports = {
  travelTime: function(start, end, mode) {
    
  }
};


distanceMatrix({
  origins: ['Golden Gate Park'],
  destinations: ['Hack Reactor'],
  language: 'en',
  mode: 'walking'
}).then(response => {
  console.log(response.json.rows[0]);
});
