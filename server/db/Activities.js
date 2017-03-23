var mongoose = require ('mongoose');
var db = require('./config');

var activitiesSchema = mongoose.Schema({
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


activitiesSchema.statics.add = function(result) {
  let newActivities = new Activities(result);
  newActivities.save().then(function() {
    console.log('activity saved'); 
  }, function(err) {
    console.log(err);
  });
}
var Activities = mongoose.model('activities', activitiesSchema);



module.exports = Activities; 