const citygrid = require('./api/citygrid');
const yelp = require('./api/yelp');

let apis = [
  citygrid
  // yelp
];

let formatData = apiResults => {

  let subResult = {
    name: '',
    adderss: {
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
    console.log('this is the current currentApiResult', currentApiResult);
    let locations = currentApiResult.results.locations;

    for (let k = 0; k < locations.length; k++) {
      let currentLocation = locations[k];
      let currentSubResult = subResult;

      currentSubResult.name = currentLocation.name;
      currentSubResult.adderss.street = currentLocation.adderss.street;
      currentSubResult.adderss.city = currentLocation.adderss.city;
      currentSubResult.adderss.state = currentLocation.adderss.state;
      currentSubResult.adderss.postal_code = currentLocation.adderss.postal_code;
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

    Promise.all(fetches)
    .then(apiResults => {
      return new Promise((resolve, reject) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(formatData(apiResults));
        }
      });
    });
  }
};

module.exports = AppService;
