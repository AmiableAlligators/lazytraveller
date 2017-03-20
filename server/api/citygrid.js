const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

// module.exports = {
// 	fetch: function(place, callback) {
//     var searchObj = {
//       where: place,
//       type: 'travel',
//       sort: 'highestrated'
//     };
// 		request('https://api.citygridmedia.com/content/places/v2/search/where?type=' + searchObj.type + '&where=' + searchObj.place + '&sort=' + searchObj.sort + '&publisher=christinedey5@gmail.com', function (err, response) {
//       if (err) {
//         console.log(err, null);
//       } else {
//         callback(null, response);
//       }
// 		});
// 	}
// }

module.exports = {
  fetch: function(place) {
    place = place.split(' ').join('%20');
    var searchObj = {
      where: place,
      type: 'travel',
      sort: 'highestrated'
    };

    return new Promise (function(resolve, reject) {
      // let requestString = `http://api.citygridmedia.com/content/places/v2/search/where?type=attractions&where=sanfrancisco,CA&sort=highestrated&format=json&publisher=test`;
      let requestString = `http://api.citygridmedia.com/content/places/v2/search/where?type=${searchObj.type}&where=${searchObj.where}&what=places%20to%20visit%20&sort=${searchObj.sort}&format=json&publisher=test`;

      request(requestString, function(error, response) {
        if (error) {
          reject(error);
        } else {
          // console.log('a response-----',response.body);
          resolve(response.body);
        }
      });
    });
  }
}

//should return a promise instead of callback
