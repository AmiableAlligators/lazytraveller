var mongoose = require ('mongoose');
var db = require('./config');

var ShortListResultsSchema = mongoose.Schema({
  userid: Number,
  activityid: String,
  like: Boolean
});

var ShortListResults = mongoose.model('ShortListResults', ShortListResultsSchema);

ShortListResults.insertShortList = function(reqBody) {
  let newShortListItem = new ShortListResults(reqBody);
  newShortListItem.save();
}

module.exports = ShortListResults; 