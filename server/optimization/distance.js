const geolib = require('geolib');
const geometry = require('./../api/googleMaps').geometry;

/**
 * Optimize sequence of visiting activities by distance.
 * @param  {Array} activities    Array of Activities Objects
 * @param  {Object} start/end    Requires a location: {
 *                               latitude: '', longitude: ''}
 * @param  {Object} queryLocation coords: {lat: '', lon: ''}
 */
module.exports = distanceOptimization = ( activities, start, end, queryLocation ) => {
  let resolvedStart;
  let resolvedEnd;
  return _resolveStartLocation(start, queryLocation)
    .then(resStart => {
      resolvedStart = resStart;
    })
    .then(() => {
      return _resolveEndLocation(end, queryLocation);
    })
    .then((resEnd) => {
      resolvedEnd = resEnd;
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
          let currLocation = activities[ i ]._activity.location;
          let dist = geolib.getDistance( startPoint.location, currLocation );
          
          if ( dist < minDist || !minDist ) {
            minDist = dist;
            index = i;
          }
        }
        // push the current nearest location into optimized array
        optimized.push( activities[ index ] );
        // let the current nearest be the next start point, and remove it from target array
        let nextStart = activities.splice( index, 1 )[ 0 ]._activity;
        // recursively call
        findPath( activities, nextStart );
      };

      findPath( activities, resolvedStart );

      /**
       * Optimized result should include the end point.
       * TODO: Temporarily removed the end point. Need to handle 
       * this object properly on the frontend
       */
      // if ( end ) {
      //   optimized.push( end );
      // }
      return optimized;
    })
};

const _resolveStartLocation = ( location, queryLocation ) => {
  let start = {
    location: {
      latitude: '',
      longitude: ''
    }
  }
  return new Promise((resolve, reject) => {
    if ( !location || location.place === '' ) {
      // if null -> use queryLocation coordinates
      start.location.latitude = queryLocation.coords.lat;
      start.location.longitude = queryLocation.coords.lon;
      resolve(start);
    } else if ( typeof location === 'string' ) {
      // if string -> need to do a text search for location coordinates
      geometry(location)
        .then(coords => {
          resolve(coords);
        })
    } else if ( typeof location === 'object' && location.place) {
      // if object -> coordinates have been passed in
      start.location.latitude = location.coords.lat;
      start.location.longitude = location.coords.lon;
      resolve(start);
    } else {
      reject('Invalid location object.');
    }
  });
}

const _resolveEndLocation = ( location, queryLocation ) => {
  let end = {
    location: {
      latitude: '',
      longitude: ''
    }
  }
  return new Promise((resolve, reject) => {
    if ( !location || location.place === '' ) {
      // if null -> use queryLocation coordinates
      end.location.latitude = queryLocation.coords.lat;
      end.location.longitude = queryLocation.coords.lon;
      resolve(end);
    } else if ( typeof location === 'string' ) {
      // if string -> need to do a text search for location coordinates
      geometry(location)
        .then(coords => {
          resolve(coords);
        })
    } else if ( typeof location === 'object' ) {
      // if object -> coordinates have been passed in
      end.location.latitude = location.coords.lat;
      end.location.longitude = location.coords.lon;
      resolve(end);
    } else {
      reject('Invalid location object.');
    }
  });
}
