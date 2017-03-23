var mongoose = require ('mongoose');
var db = require('./config');

var ApiResultsSchema = mongoose.Schema({
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

var ApiResults = mongoose.model('ApiResults', ApiResultsSchema);

ApiResults.insertApiResult = function(result) {
  let newApiResult = new ApiResults(result);
  newApiResult.save();
}

module.exports = ApiResults; 