var mongoose = require ('mongoose');
var db = require('./config');

var ShortlistResultsSchema = mongoose.Schema({
  user_id: Number,
  activity_id: String,
  like: Boolean,
  query: {
  	id: String,
  	string: String
  }
});

ShortlistResultsSchema.statics.shortlist = function(shortlist) {
	let newShortlist = new ShortlistResults(shortlist);
	return new Promise((resolve, reject) => {
		newShortlist.save().then(result => {
			resolve(result);
		}).catch(error => {
			reject(error);
		})
	})
}

var ShortlistResults = mongoose.model('ShortlistResults', ShortlistResultsSchema);

module.exports = ShortlistResults; 