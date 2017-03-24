var mongoose = require('mongoose');
var db = require('./config');
mongoose.Promise = require('bluebird');

var categoriesSchema = mongoose.Schema({
  name: String,
  type: String,
  associated_tags: {
    CityGrid: [Number],
    Yelp: [String]
  }
});

var Categories;

try {
  Categories = mongoose.model('Categories');
} catch (error) {
  Categories = mongoose.model('Categories', categoriesSchema);
}

module.exports = Categories;