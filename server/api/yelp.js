const Yelp = require('yelp-fusion');
const ApiResults = require('./../db/ApiResults.js');

const yelp = Yelp.client(process.env.YELP_TOKEN);

module.exports = {
  fetch: function(queryWithFilters) {
    let searchObj = {
      term: 'attractions',
      location: queryWithFilters.query,
      limit: 20,
      // price: '1,2,3,4' // this will return all price range businesses, but only "businesses"
    };

    return new Promise(function(resolve, reject) {
      yelp.search(searchObj).then(res => resolve(formatData(res.body)))
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
      name: currentLocation.name,
      address: {
        street: currentLocation.location.address1,
        city: currentLocation.location.city,
        state: currentLocation.location.state,
        postal_code: currentLocation.location.zip_code
      },
      image: currentLocation.image_url,
      location: {
        longitude: currentLocation.coordinates.longitude,
        latitude: currentLocation.coordinates.latitude
      },
      phone_number: currentLocation.phone,
      rating: currentLocation.rating,
      price: currentLocation.price ? currentLocation.price : 'free', // maybe need to set to null?
      neighborhood: null,
      isClosed: currentLocation.is_closed,
      api_reference: {
        api: 'Yelp',
        reference_id: currentLocation.id
      }
    };
    ApiResults.insertApiResult(currentSubResult);
    results.push(currentSubResult);
  }

  return results;
};
