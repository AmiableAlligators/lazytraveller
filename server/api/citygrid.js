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
      Categories.findOne({ 'name': 'Museums' }, 'associated_tags.CityGrid', function(err, category) {
         if (err) return handleError(err);
         resolve(category.associated_tags.CityGrid);
       });
    }).then(function(argument){
      return new Promise (function(resolve, reject) {
      let requestString = `http://api.citygridmedia.com/content/places/v2/search/where?type=${search.type}&where=${search.where}&what=places%20to%20visit%20&sort=${search.sort}&format=json&publisher=10000019378`;
      request(requestString, function(error, response) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          // console.log('a response-----',response.body);
          resolve(response.body);
        }
      });
    });
    });
    
    return new Promise (function(resolve, reject) {
      let requestString = `http://api.citygridmedia.com/content/places/v2/search/where?type=${search.type}&where=${search.where}&what=places%20to%20visit%20&sort=${search.sort}&format=json&publisher=10000019378`;
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
      neighborhood: currentLocation.neighborhood,
      isClosed: null,
      api_reference: {
        'citygrid': {
          reference_id: currentLocation.id
        }  
      }
    };
    results.push(currentSubResult);
  }

  return results;
};
