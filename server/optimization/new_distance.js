const geolib = require('geolib');
const geometry = require('./../api/googleMap').geometry;

const distanceOptimization = ( activities, start, end ) => {

  start = start || { location: { latitude: 37.774929, longitude: -122.419416 } };

  if ( start.place ) {
    start = { location: { latitude: start.coords.lat, longitude: start.coords.lat }};
  }

  if ( end && end.place ) {
    end = { location: { latitude: end.coords.lat, longitude: end.coords.lat }};
  }

  if (typeof start === 'string') {
    geometry( start )
    .then( res => start = res );
  }

  if (typeof end === 'string') {
    geometry( end )
    .then( res => end = res );
  }

  // initialize the optimized results
  let optimized = [];
  // use a recursive function to find the "next nearest location" from the start location
  let findPath = ( activities, startPoint ) => {
    // base case
    if ( !activities.length ) {
      return;
    }
    // re-initialize for each recursion
    let minDist = null;
    let index = null;
    // use loop to find minimum distance
    for ( let i = 0; i < activities.length; i++ ) {
      let currLocation = activities[ i ].location;
      let dist = geolib.getDistance( startPoint.location, currLocation );
      if ( dist < minDist || !minDist ) {
        minDist = dist;
        index = i;
      }
    }
    // push the current nearest location into optimized array
    optimized.push( activities[ index ] );
    // let the current nearest be the next start point, and remove it from target array
    let nextStart = activities.splice( index, 1 )[ 0 ];
    // recursively call
    findPath( activities, nextStart );
  };

  findPath( activities, start );

  // optimized result should include the end point
  if ( end ) {
    optimized.push( end );
  }

  return optimized;
  // return new Promise( ( resolve, reject ) => {
  //   resolve(optimized);
  // });
};

module.exports = distanceOptimization;

// let activities = [
//     {
//         "name": "Wave Cafe",
//         "address": {
//             "street": "1969 Tully Rd",
//             "city": "San Jose",
//             "state": "CA",
//             "postal_code": "95122"
//         },
//         "image": "https://s3-media4.fl.yelpcdn.com/bphoto/FNZnkuUXWjQVwAVc3hoVVw/o.jpg",
//         "location": {
//             "longitude": -121.8216171,
//             "latitude": 37.3259506
//         },
//         "phone_number": "+14089292256",
//         "rating": 4,
//         "price": "$",
//         "neighborhood": null,
//         "isClosed": false,
//         "api_reference": {
//             "yelp": {
//                 "reference_id": "wave-cafe-san-jose"
//             }
//         }
//     },
//     {
//         "name": "JJ Customs",
//         "address": {
//             "street": "317 Branham Ln E",
//             "city": "San Jose",
//             "state": "CA",
//             "postal_code": "95111"
//         },
//         "image": "https://s3-media2.fl.yelpcdn.com/bphoto/v8Ihi9jVXrPPcsYO547DDA/o.jpg",
//         "location": {
//             "longitude": -121.812942504883,
//             "latitude": 37.2694816589355
//         },
//         "phone_number": "+14082283560",
//         "rating": 5,
//         "price": "$",
//         "neighborhood": null,
//         "isClosed": false,
//         "api_reference": {
//             "yelp": {
//                 "reference_id": "jj-customs-san-jose"
//             }
//         }
//     },
//     {
//         "name": "Cafe Quyen",
//         "address": {
//             "street": "1692 Tully Rd",
//             "city": "San Jose",
//             "state": "CA",
//             "postal_code": "95122"
//         },
//         "image": "https://s3-media1.fl.yelpcdn.com/bphoto/DZOSnVv7ouK8BfOo8sPYIg/o.jpg",
//         "location": {
//             "longitude": -121.826171875,
//             "latitude": 37.3204536437988
//         },
//         "phone_number": "+14085319602",
//         "rating": 3.5,
//         "price": "$",
//         "neighborhood": null,
//         "isClosed": false,
//         "api_reference": {
//             "yelp": {
//                 "reference_id": "cafe-quyen-san-jose"
//             }
//         }
//     },
//     {
//         "name": "Good Life Nutrition",
//         "address": {
//             "street": "437 S Kiely Blvd",
//             "city": "San Jose",
//             "state": "CA",
//             "postal_code": "95117"
//         },
//         "image": "https://s3-media4.fl.yelpcdn.com/bphoto/Q739Y8sXX9kBgu8jw3Mi7Q/o.jpg",
//         "location": {
//             "longitude": -121.971480846405,
//             "latitude": 37.3199873307177
//         },
//         "phone_number": "+14082477814",
//         "rating": 4.5,
//         "price": "$",
//         "neighborhood": null,
//         "isClosed": false,
//         "api_reference": {
//             "yelp": {
//                 "reference_id": "good-life-nutrition-san-jose"
//             }
//         }
//     }
//
// ];

// let start = {
//     "name": "Winchester Mystery House",
//     "address": {
//         "street": "525 S Winchester Blvd",
//         "city": "San Jose",
//         "state": "CA",
//         "postal_code": "95128"
//     },
//     "image": "",
//     "location": {
//         "longitude": -121.950366,
//         "latitude": 37.319087
//     },
//     "phone_number": "4082472000",
//     "rating": 8,
//     "price": null,
//     "neighborhood": "West Valley",
//     "isClosed": null,
//     "api_reference": {
//         "citygrid": {
//             "reference_id": 35772116
//         }
//     }
// };

// let end = {
//     "name": "99 Cents Only Store",
//     "address": {
//         "street": "1915 W San Carlos",
//         "city": "San Jose",
//         "state": "CA",
//         "postal_code": "95110"
//     },
//     "image": "https://s3-media1.fl.yelpcdn.com/bphoto/qhWjMkz4QXDDV69Pa6yHAQ/o.jpg",
//     "location": {
//         "longitude": -121.9292,
//         "latitude": 37.32371
//     },
//     "phone_number": "+14089711501",
//     "rating": 3.5,
//     "price": "$",
//     "neighborhood": null,
//     "isClosed": false,
//     "api_reference": {
//         "yelp": {
//             "reference_id": "99-cents-only-store-san-jose-2"
//         }
//     }
// };

// let result = distanceOptimization(activities, start);
//
// console.log(result);
