const citygrid = require('./api/citygrid');
const yelp = require('./api/yelp');

let apis = [
  citygrid
  // yelp
];

let formatData = apiResults => {

  let subResult = {
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

  let results = [];

  for (let i = 0; i < apiResults.length; i++) {
    let currentApiResult = JSON.parse(apiResults[i]);
    let locations = currentApiResult.results.locations;

    for (let k = 0; k < locations.length; k++) {
      let currentLocation = locations[k];
      let currentSubResult = subResult;

      currentSubResult.name = currentLocation.name;
      currentSubResult.address.street = currentLocation.address.street;
      currentSubResult.address.city = currentLocation.address.city;
      currentSubResult.address.state = currentLocation.address.state;
      currentSubResult.address.postal_code = currentLocation.address.postal_code;
      currentSubResult.image = currentLocation.image;
      currentSubResult.location.longitude = currentLocation.longitude;
      currentSubResult.location.latitude = currentLocation.latitude;
      currentSubResult.phone_number = currentLocation.phone_number;
      currentSubResult.rating = currentLocation.rating;
      currentSubResult.neighborhood = currentLocation.neighborhood;
      currentSubResult.isClosed = null;
      currentSubResult.api_reference.api_name = 'citygrid';
      currentSubResult.api_reference.api_id =currentLocation.id;

      results.push(currentSubResult);
    }
  }

  return results;
};

/**
 * @queryWithFilters is an Object with structure:
 * {
 *   query: String, what the user is searching for,
 *   filters: Array, of filter-ids
 * }
 */
const AppService = {
  find: function(queryWithFilters) {
    let fetches = apis.map(func => {
      return func.fetch(queryWithFilters);
    });

    return Promise.all(fetches)
    .then(apiResults => {
      return new Promise((resolve, reject) => {
        resolve(formatData(apiResults));
      });
    })
    .catch(error => console.error(error));
  }
};

module.exports = AppService;
