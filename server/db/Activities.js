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
  return new Promise ((resolve, reject) => {
    newActivities.save().then(function() {
      resolve();
    }).catch(function(error) {
      reject(error);
    })
  });
}

/**
 * Checks database for the entry, creates an entry if it doesn't exist.
 * See: http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
 * @param  {Object}   query    Properties defined in schema to search for
 * @param  {Object}   update   Object/properties used to update
 * @param  {Function} callback Passing in a callback instead of a Promise
 */
activitiesSchema.statics.findAndUpdate = function(query, update, callback) {
  let options = {
    new: true,
    upsert: true
  }
  this.findOneAndUpdate(query, update, options, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      callback(result);
    }
  });
}

var Activities = mongoose.model('activities', activitiesSchema);

module.exports = Activities;
