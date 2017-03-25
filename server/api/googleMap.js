const Promise = require('bluebird');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY;
});

const distanceMatrix = Promise.promisify(googleMapsClient.distanceMatrix);
const geocode = Promise.promisify(googleMapsClient.geocode);

module.exports = {
  travelTime: function(start, end, mode) {
    let origin = `${ start.location.latitude },${ start.location.longitude }`;
    let destination = `${ end.location.latitude },${ end.location.longitude }`;

    return new Promise( ( resolve, reject ) => {
      distanceMatrix({
        origins: [ origin ],
        destinations: [ destination ],
        language: 'en',
        mode: mode
      })
      .then( response => {
        let travelTime = response.json.rows[0].elements[0].duration.value / 3600;
        resolve( travelTime );
      })
      .catch( error => {
        reject( error );
      });
    });
  },

  geometry: function(inputAddress) {
    return new Promise( (resolve, reject ) => {
      geocode( { address: inputAddress } )
      .then( response => {
        resolve( { location: {
          latitude: response.json.results[0].geometry.location.lat,
          longitude: response.json.results[0].geometry.location.lng
        }} );
      })
      .catch( error => {
        reject(error);
      });
    })
  },

  // other google/map api functions come here
};
