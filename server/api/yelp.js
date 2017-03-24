const Yelp = require('yelp-fusion');
const yelp = Yelp.client(process.env.YELP_TOKEN);
const Categories = require('./../db/Categories.js');

module.exports = {
  fetch: function(queryWithFilters) {
    let search = {
      term: 'attractions',
      categories: null,
      location: queryWithFilters.query,
      limit: 20,
      // price: '1,2,3,4' // this will return all price range businesses, but only "businesses"
    };

    return new Promise(function(resolve, reject) {
      Categories.find({ '_id': { $in: queryWithFilters.filters } }, 'associated_tags.Yelp', function(err, category) {
        if (err) return handleError(err);
        //category is an array of objects
        var arrayFilters = [];
        category.forEach(function(item) {
          arrayFilters = arrayFilters.concat(item.associated_tags.Yelp);
        });
          search.categories = arrayFilters.join(',');
          resolve();
      });
    }).then(function(argument){
      return new Promise (function(resolve, reject) {
        yelp.search(search).then(res => resolve(formatData(res.body)))
        .catch(err => reject(err));
      });
    });
  }
}

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
    results.push(currentSubResult);
  }

  return results;
};