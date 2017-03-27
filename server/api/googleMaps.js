const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const Google = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS,
  Promise: Promise
});

const distanceMatrix = Promise.promisify(Google.distanceMatrix);
const geocode = Promise.promisify(Google.geocode);

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

  fetchPhotos: function (object) {
    return Google.places({ 
      query: `${object.name} in ${object.address.city}, ${object.address.state}`
    }).asPromise()
      .then(result => {
        return Google.place({ 
          placeid: result.json.results[0].place_id 
        }).asPromise()
      })
      .then(result => {
        return new Promise ((resolve, reject) => {
          var arrayOfUrls = [];
          result.json.result.photos &&
          result.json.result.photos.map(function(item) {
            var requestString = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${process.env.GOOGLE_MAPS}`;
            arrayOfUrls.push(requestString);  
          });
          object.photos = arrayOfUrls;
          resolve(arrayOfUrls);
        });
      })
      .catch(err => {
        console.error(err.message);
      })
  }
}

