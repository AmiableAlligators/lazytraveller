var mongoose = require ('mongoose');
var db = require('./config');

var categoriesSchema = mongoose.Schema({
  name: String,
  associated_tags: {
    CityGrid: Number
  }
});

var Categories = mongoose.model('Categories', categoriesSchema);
var museum = new Categories({name: "Museums", associated_tags: { CityGrid: 96 }});
museum.save(); 

//how to get autoincrementing id?   

module.exports = Categories; 