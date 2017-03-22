const Yelp = require('yelpv3');

const yelp = new Yelp({
  app_id: process.env.YELP_APP_ID,
  app_secret: process.env.YELP_APP_SECRET
})

module.exports = {
  fetch: function(queryWithFilters) {
    let searchObj = {
      term: 'attractions',
      location: queryWithFilters.query,
      limit: 20
    };

    return new Promise(function(resolve, reject) {
      yelp.search(searchObj).then(data => resolve(formatData(data)))
      .catch(err => reject(err));
    });
  }
};

let formatData = apiResult => {
  let locations = JSON.parse(apiResult).businesses;
  let results = [];

  for (let i = 0; i < locations.length; i++) {
    let currentLocation = locations[i];
    let currentSubResult = {
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        postal_code: ''
      },
      image: '',
      location: {
        longitude: '',
        latitude: ''
      },
      phone_number: '',
      rating: null,
      neighborhood: '',
      isClosed: null,
      api_reference: {
        api_name: '',
        api_id: ''
      }
    };

    currentSubResult.name = currentLocation.name;
    currentSubResult.address.street = currentLocation.location.address1;
    currentSubResult.address.city = currentLocation.location.city;
    currentSubResult.address.state = currentLocation.location.state;
    currentSubResult.address.postal_code = currentLocation.location.zip_code;
    currentSubResult.image = currentLocation.image_url;
    currentSubResult.location.longitude = currentLocation.coordinates.longitude;
    currentSubResult.location.latitude = currentLocation.coordinates.latitude;
    currentSubResult.phone_number = currentLocation.phone;
    currentSubResult.rating = currentLocation.rating;
    currentSubResult.neighborhood = null;
    currentSubResult.isClosed = currentLocation.is_closed;
    currentSubResult.api_reference.api_name = 'yelp';
    currentSubResult.api_reference.api_id =currentLocation.id;

    results.push(currentSubResult);
  }

  return results;
};

// let formatData = apiResults => {
//
//   let results = [];
//
//   for (let i = 0; i < apiResults.length; i++) {
//     let currentApiResult = JSON.parse(apiResults[i]);
//     let locations = currentApiResult.results.locations;
//
//     for (let k = 0; k < locations.length; k++) {
//       let currentLocation = locations[k];
//       let currentSubResult = {
//         name: '',
//         address: {
//           street: '',
//           city: '',
//           state: '',
//           postal_code: ''
//         },
//         image: '',
//         location: {
//           longitude: '',
//           latitude: ''
//         },
//         phone_number: '',
//         rating: null,
//         neighborhood: '',
//         isClosed: null,
//         api_reference: {
//           api_name: '',
//           api_id: ''
//         }
//       };
//
//       currentSubResult.name = currentLocation.name;
//       currentSubResult.address.street = currentLocation.address.street;
//       currentSubResult.address.city = currentLocation.address.city;
//       currentSubResult.address.state = currentLocation.address.state;
//       currentSubResult.address.postal_code = currentLocation.address.postal_code;
//       currentSubResult.image = currentLocation.image;
//       currentSubResult.location.longitude = currentLocation.longitude;
//       currentSubResult.location.latitude = currentLocation.latitude;
//       currentSubResult.phone_number = currentLocation.phone_number;
//       currentSubResult.rating = currentLocation.rating;
//       currentSubResult.neighborhood = currentLocation.neighborhood;
//       currentSubResult.isClosed = null;
//       currentSubResult.api_reference.api_name = 'citygrid';
//       currentSubResult.api_reference.api_id =currentLocation.id;
//
//       results.push(currentSubResult);
//     }
//   }
//
//   return results;
// };
