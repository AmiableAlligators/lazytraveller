const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

module.exports = {
  fetch: function(queryWithFilters) {
    var search = {
      where: queryWithFilters.query.split(' ').join('%20'),
      type: 'attractions',
      sort: 'highestrated'
    };

    return new Promise (function(resolve, reject) {
      let requestString = `http://api.citygridmedia.com/content/places/v2/search/where?type=${search.type}&where=${search.where}&what=places%20to%20visit%20&sort=${search.sort}&format=json&publisher=${process.env.CITYGRID_PUBLISHER}`;
      request(requestString, function(error, response) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(formatData(response.body));
        }
      });
    });
  }
}

let formatData = apiResult => {
  let locations = JSON.parse(apiResult).results.locations;
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

  return results;
};
