const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const Categories = require('./../db/Categories.js');
const DatabaseResults = require('./../db/DatabaseResults.js');

module.exports = {
  fetch: function(queryWithFilters) {
    var search = {
      where: queryWithFilters.query.split(' ').join('%20'),
      // type: 'attractions',
      sort: 'highestrated',
      tag: null
      // tag end result = arrayFilters
    };
    return new Promise (function(resolve, reject) {
      
      if (queryWithFilters.filters.length === 0) { 
        search.tag = '75';
        resolve();
      } else {
        Categories.find({ '_id': { $in: queryWithFilters.filters } }, 'associated_tags.CityGrid', function(err, category) {
          if (err) return handleError(err);
          //category is an array of objects
          var arrayFilters = [];
          category.forEach(function(item) {
            arrayFilters = arrayFilters.concat(item.associated_tags.CityGrid);
          });
            // search.tag will be in the format tagID&tagID&tagID
            search.tag = arrayFilters.join('&');
            resolve();
        });
      }
      //sends the citygrid api request
    }).then(function(argument){
      return new Promise (function(resolve, reject) {
        let requestString = `http://api.citygridmedia.com/content/places/v2/search/where?tag=${search.tag}&where=${search.where}&what=places%20to%20visit%20&sort=${search.sort}&format=json&publisher=${process.env.CITYGRID_PUBLISHER}`;
        request(requestString, function(error, response) {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(formatData(response.body));
          }
        });
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
      name: currentLocation.name,
      address: {
        street: currentLocation.address.street,
        city: currentLocation.address.city,
        state: currentLocation.address.state,
        postal_code: currentLocation.address.postal_code
      },
      image: currentLocation.image,
      location: {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
      },
      phone_number: currentLocation.phone_number,
      rating: currentLocation.rating,
      price: null,
      neighborhood: currentLocation.neighborhood,
      isClosed: null,
      api_reference: {
        api: 'CityGrid',
        reference_id: currentLocation.id
      }
    };
    DatabaseResults.insertDatabaseResult(currentSubResult);
    results.push(currentSubResult);
  }

  return results;
};
