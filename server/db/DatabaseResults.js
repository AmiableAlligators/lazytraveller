var mongoose = require ('mongoose');
var db = require('./config');

var DatabaseResultsSchema = mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    postal_code: Number
  },
  image: String,
  location: {
    longitude: Number,
    latitude: Number
  },
  phone_number: String,
  rating: Number,
  price: String, 
  neighborhood: String,
  isClosed: String,
  api_reference: {
    api: String,
    reference_id: String
  }
});

var DatabaseResults = mongoose.model('DatabaseResults', DatabaseResultsSchema);

DatabaseResults.insertDatabaseResult = function(result) {
  let newDatabaseResult = new DatabaseResults(result);
  newDatabaseResult.save();
}

module.exports = DatabaseResults; 