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
    var searchObj = {
      where: place,
      type: 'travel',
      sort: 'highestrated' 
    };

    return new Promise (function(resolve, reject) {
      request('https://api.citygridmedia.com/content/places/v2/search/where?type=' + searchObj.type + '&where=' + searchObj.place + '&sort=' + searchObj.sort + '&publisher=christinedey5@gmail.com', function(error, response) {
        if (error) {
          reject(error);         
        } else {
          resolve(response);
        }
      });
    });
  } 
}

//should return a promise instead of callback 


