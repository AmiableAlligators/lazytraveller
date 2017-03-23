var mongoose = require ('mongoose');
var db = require('./config');

var ShortlistResultsSchema = mongoose.Schema({
  user_id: Number,
  activity_id: String,
  like: Boolean
});

var ShortlistResults = mongoose.model('ShortlistResults', ShortlistResultsSchema);

ShortlistResults.insertShortlist = function(reqBody) {
  let newShortlistItem = new ShortlistResults(reqBody);
  newShortlistItem.save();
}

module.exports = ShortlistResults; 