var mongoose = require ('mongoose');
var db = require('./config');

var ShortlistResultsSchema = mongoose.Schema({
  user_id: Number,
  _activity: { type: String, ref: 'activities' },
  activity_id: String,
  like: Boolean,
  query: {
  	id: String,
  	string: String
  }
});

/**
 * Shortlists an Activity.
 * @param  {Object} shortlist  contains:
 *     user_id: Number,
 *     activity_id: String,
 *     _activity: String, (For Mongoose Population)
 *     like: Boolean,
 *     query: {
 *       id: String,
 *       string: String
 *     },
 *     completed: Boolean,
 *     limits: Object
 */
ShortlistResultsSchema.statics.shortlist = function(shortlist) {
	shortlist._activity = shortlist.activity_id;
	let newShortlist = new ShortlistResults(shortlist);
	return new Promise((resolve, reject) => {
		newShortlist.save().then(result => {
			resolve(result);
		}).catch(error => {
			reject(error);
		})
	})
}

ShortlistResultsSchema.statics.getWithQueryId = function(queryId) {
	return ShortlistResults.find({ 'query.id': queryId })
    .populate('_activity')
    .exec();
}

var ShortlistResults = mongoose.model('ShortlistResults', ShortlistResultsSchema);

module.exports = ShortlistResults; 