const geolib = require('geolib');

module.exports = distanceOptimization = ( start, end, radius = 8000, locations ) => {
  // START
  // 1. if start is null, set default as SF (lat: 37.774929, lon: -122.419416 )
  start = start || {latitude: 37.774929, longitude: -122.419416}
  // 2. if start is a string, grab the location
  // TODO: if (typeof start === 'string') { use geo lib to get lat & lon }
  // 3. if start.place is defined, means lon & lat have been passed in
  // TODO: start = { latitude: start.coords.lat, longitude: start.coords.lat}

  // TODO: SAME FOR END

  // find the center point between start and end
  let center = geolib.getCenter( [ start.location, end.location ] );
  // from the center, use the user input radius or the half of distance as the radius to make a circle
  radius = radius || geolib.getDistance( start.location, end.location ) / 2;
  // find all activity locations that are inside of the circle
  // also need to return all out range locations to user
  let inRangeLocations = [];
  let outRangeLocations = [];
  locations.forEach( obj => {
    if ( geolib.isPointInCircle( obj.location, center, radius )) {
      inRangeLocations.push( obj );
    } else {
      outRangeLocations.push( obj );
    }
  });

  // initialize the optimized results
  let optimized = [];
  // use a recursive function to find the "next nearest location" from the start location
  let findPath = ( locations, startPoint ) => {
    // base case
    if ( !locations.length ) {
      return;
    }
    // re-initialize for each recursion
    let minDist = null;
    let index = null;
    // use loop to find minimum distance
    for ( let i = 0; i < locations.length; i++ ) {
      let currLocation = locations[ i ];
      let dist = geolib.getDistance( start.location, currLocation.location );
      if ( dist < minDist || !minDist ) {
        minDist = dist;
        index = i;
      }
    }
    // push the current nearest location into optimized array
    optimized.push( locations[ index ] );
    // let the current nearest be the next start point, and remove it from target array
    let nextStart = locations.splice( index, 1 );
    // recursively call
    findPath( locations, nextStart );
  };

  findPath( inRangeLocations, start );
  // optimized result should include the end point
  optimized.push( end );
  // the last element in the optimized array will be a sub-array which contains all outRangeLocations
  optimized.push( outRangeLocations );

  // return optimized;
  return new Promise( ( resolve, reject ) => {
    resolve(optimized);
  });
};



// ««««««««« below is for testing, please leave it for now »»»»»»»»»
let locations = [
    {
        "name": "Happy Hollow Park & Zoo",
        "address": {
            "street": "1300 Senter Rd",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95112"
        },
        "image": "",
        "location": {
            "longitude": -121.86542,
            "latitude": 37.325503
        },
        "phone_number": "4082773000",
        "rating": 8,
        "price": null,
        "neighborhood": "Central",
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 1101691
            }
        }
    },
    {
        "name": "The Tech Museum",
        "address": {
            "street": "201 S Market St",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95113"
        },
        "image": "",
        "location": {
            "longitude": -121.890126,
            "latitude": 37.331629
        },
        "phone_number": "4082948324",
        "rating": 0,
        "price": null,
        "neighborhood": "Central San Jose",
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 605685702
            }
        }
    },
    {
        "name": "Grand Central Sauna & Hot Tub",
        "address": {
            "street": "376 Saratoga Ave",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95129"
        },
        "image": "",
        "location": {
            "longitude": -121.971731,
            "latitude": 37.320843
        },
        "phone_number": "4082478827",
        "rating": 7,
        "price": null,
        "neighborhood": "West Valley",
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 1121368
            }
        }
    },
    {
        "name": "Nickel City",
        "address": {
            "street": "1711 Branham Ln",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95118"
        },
        "image": "",
        "location": {
            "longitude": -121.909761,
            "latitude": 37.25223
        },
        "phone_number": "4084483323",
        "rating": 8,
        "price": null,
        "neighborhood": "Cambrian",
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 1107256
            }
        }
    },
    {
        "name": "Rengstorff House",
        "address": {
            "street": "3070 N. Shoreline Blvd",
            "city": "Mountain View",
            "state": "CA",
            "postal_code": "94043"
        },
        "image": "",
        "location": {
            "longitude": -122.087149,
            "latitude": 37.431484
        },
        "phone_number": "6509036392",
        "rating": 10,
        "price": null,
        "neighborhood": null,
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 11435447
            }
        }
    },
    {
        "name": "California's Great America",
        "address": {
            "street": "4701 Great America Pkwy",
            "city": "Santa Clara",
            "state": "CA",
            "postal_code": "95054"
        },
        "image": "",
        "location": {
            "longitude": -121.977765,
            "latitude": 37.395991
        },
        "phone_number": "4089881776",
        "rating": 0,
        "price": null,
        "neighborhood": null,
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 624675820
            }
        }
    },
    {
        "name": "Bowlmor Cupertino",
        "address": {
            "street": "10123 N Wolfe Rd 2001",
            "city": "Cupertino",
            "state": "CA",
            "postal_code": "95014"
        },
        "image": "",
        "location": {
            "longitude": -122.014549,
            "latitude": 37.325658
        },
        "phone_number": "4082522695",
        "rating": 0,
        "price": null,
        "neighborhood": null,
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 664486394
            }
        }
    },
    {
        "name": "Curiodyssey",
        "address": {
            "street": "1651 Coyote Point Dr",
            "city": "San Mateo",
            "state": "CA",
            "postal_code": "94401"
        },
        "image": "http://images.citysearch.net/assets/imgdb/guide/2011/3/1/0/WDOeKHmH296.jpeg",
        "location": {
            "longitude": -122.319638,
            "latitude": 37.590629
        },
        "phone_number": "6503427755",
        "rating": 8,
        "price": null,
        "neighborhood": "Shoreview",
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 927695
            }
        }
    },
    {
        "name": "Ardenwood Historical Farm",
        "address": {
            "street": "34600 Ardenwood Blvd",
            "city": "Fremont",
            "state": "CA",
            "postal_code": "94555"
        },
        "image": "",
        "location": {
            "longitude": -122.054061,
            "latitude": 37.553065
        },
        "phone_number": "5107960663",
        "rating": 9,
        "price": null,
        "neighborhood": null,
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 11595723
            }
        }
    },
    {
        "name": "Malibu Castle",
        "address": {
            "street": "320 Blomquist St",
            "city": "Redwood City",
            "state": "CA",
            "postal_code": "94063"
        },
        "image": "",
        "location": {
            "longitude": -122.21743,
            "latitude": 37.492859
        },
        "phone_number": "6503671906",
        "rating": 9,
        "price": null,
        "neighborhood": null,
        "isClosed": null,
        "api_reference": {
            "citygrid": {
                "reference_id": 850085
            }
        }
    },
    {
        "name": "Wave Cafe",
        "address": {
            "street": "1969 Tully Rd",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95122"
        },
        "image": "https://s3-media4.fl.yelpcdn.com/bphoto/FNZnkuUXWjQVwAVc3hoVVw/o.jpg",
        "location": {
            "longitude": -121.8216171,
            "latitude": 37.3259506
        },
        "phone_number": "+14089292256",
        "rating": 4,
        "price": "$",
        "neighborhood": null,
        "isClosed": false,
        "api_reference": {
            "yelp": {
                "reference_id": "wave-cafe-san-jose"
            }
        }
    },
    {
        "name": "JJ Customs",
        "address": {
            "street": "317 Branham Ln E",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95111"
        },
        "image": "https://s3-media2.fl.yelpcdn.com/bphoto/v8Ihi9jVXrPPcsYO547DDA/o.jpg",
        "location": {
            "longitude": -121.812942504883,
            "latitude": 37.2694816589355
        },
        "phone_number": "+14082283560",
        "rating": 5,
        "price": "$",
        "neighborhood": null,
        "isClosed": false,
        "api_reference": {
            "yelp": {
                "reference_id": "jj-customs-san-jose"
            }
        }
    },
    {
        "name": "Cafe Quyen",
        "address": {
            "street": "1692 Tully Rd",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95122"
        },
        "image": "https://s3-media1.fl.yelpcdn.com/bphoto/DZOSnVv7ouK8BfOo8sPYIg/o.jpg",
        "location": {
            "longitude": -121.826171875,
            "latitude": 37.3204536437988
        },
        "phone_number": "+14085319602",
        "rating": 3.5,
        "price": "$",
        "neighborhood": null,
        "isClosed": false,
        "api_reference": {
            "yelp": {
                "reference_id": "cafe-quyen-san-jose"
            }
        }
    },
    {
        "name": "Good Life Nutrition",
        "address": {
            "street": "437 S Kiely Blvd",
            "city": "San Jose",
            "state": "CA",
            "postal_code": "95117"
        },
        "image": "https://s3-media4.fl.yelpcdn.com/bphoto/Q739Y8sXX9kBgu8jw3Mi7Q/o.jpg",
        "location": {
            "longitude": -121.971480846405,
            "latitude": 37.3199873307177
        },
        "phone_number": "+14082477814",
        "rating": 4.5,
        "price": "$",
        "neighborhood": null,
        "isClosed": false,
        "api_reference": {
            "yelp": {
                "reference_id": "good-life-nutrition-san-jose"
            }
        }
    }

];

let start = {
    "name": "Winchester Mystery House",
    "address": {
        "street": "525 S Winchester Blvd",
        "city": "San Jose",
        "state": "CA",
        "postal_code": "95128"
    },
    "image": "",
    "location": {
        "longitude": -121.950366,
        "latitude": 37.319087
    },
    "phone_number": "4082472000",
    "rating": 8,
    "price": null,
    "neighborhood": "West Valley",
    "isClosed": null,
    "api_reference": {
        "citygrid": {
            "reference_id": 35772116
        }
    }
};

let end = {
    "name": "99 Cents Only Store",
    "address": {
        "street": "1915 W San Carlos",
        "city": "San Jose",
        "state": "CA",
        "postal_code": "95110"
    },
    "image": "https://s3-media1.fl.yelpcdn.com/bphoto/qhWjMkz4QXDDV69Pa6yHAQ/o.jpg",
    "location": {
        "longitude": -121.9292,
        "latitude": 37.32371
    },
    "phone_number": "+14089711501",
    "rating": 3.5,
    "price": "$",
    "neighborhood": null,
    "isClosed": false,
    "api_reference": {
        "yelp": {
            "reference_id": "99-cents-only-store-san-jose-2"
        }
    }
};

// let result = distanceOptimization(start, end, 8000, locations);

// console.log(result);
