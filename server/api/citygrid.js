const request = require('request');

module.exports = {
	fetch: function(place, callback) {
    var searchObj = {
      where: place,
      type: 'travel',
      sort: 'highestrated' 
    };
		request('https://api.citygridmedia.com/content/places/v2/search/where?type=travel&where=' + place + '&sort=highestrated&publisher=christinedey5@gmail.com', function (err, response) {
      if (err) {
        console.log(err, null);
      } else {
        callback(null, response);
      }
		});	
	} 
}

//should return a promise instead of callback 


