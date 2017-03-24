import $ from 'jquery';

const GeoLocation = {
	/**
	 * Checks if the browser supports geolocation.
	 * @param  {Function} callback takes the following:
	 *         Boolean Supported, 
	 *         String Error message
	 */
	isSupported(callback) {
		if (navigator.geolocation) {
			return callback(true);
		}
		return callback(false, 'Your browser does not support geolocation.');
	},

	/**
	 * Gets current location of the browser.
	 * @param  {Function} callback takes the following:
	 *         String Current location, 
	 *         Object Coords {lat, lon}, 
	 *         String Error message
	 */
	getCurrentPosition(callback) {
		navigator.geolocation.getCurrentPosition(
			position => {
				let coords = {
					lat: position.coords.latitude,
					lon: position.coords.longitude
				}
				GeoLocation._reverseGeocode(
					coords.lat, coords.lon, 
					resultLabel => {
						callback(resultLabel, coords, null);
				})
			},
			error => {
        console.log('Error occurred. Error code: ', error.code);
        callback(null, null, error.code);
			}
		);
	},

	_reverseGeocode(lat, lon, callback) {
		$.ajax({
      url: `https://search.mapzen.com/v1/reverse?api_key=${process.env.MAPZEN_KEY}&point.lat=${lat}&point.lon=${lon}&size=1&sources=osm`,
      method: 'GET',
      success: function(results) {
      	callback(results.features[0].properties.label);
      }
    });
	}
}

export default GeoLocation;