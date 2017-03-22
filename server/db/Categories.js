 var mongoose = require ('mongoose');
 var db = require('./config');

 var categoriesSchema = mongoose.Schema({
   name: String,
   associated_tags: {
     CityGrid: [Number]
    }
  });

  var categoriesArray = [
   {name: "Museums", associated_tags: { CityGrid: [96] }},
   {name: "Amusement Parks", associated_tags: { CityGrid: [76] }},
   {name: "Aquariums", associated_tags: { CityGrid: [77] }},
   {name: "Zoos", associated_tags: { CityGrid: [103] }},
   {name: "Shopping Centers & Malls", associated_tags: { CityGrid: [6229] }},
   {name: "Art Centers", associated_tags: { CityGrid: [71] }},
   {name: "Historical Sites", associated_tags: { CityGrid: [91] }},
   {name: "Cultural Centers", associated_tags: { CityGrid: [87] }},
   {name: "Botanical Gardens", associated_tags: { CityGrid: [81] }},
   {name: "Hot Springs", associated_tags: { CityGrid: [93] }},
   {name: "Beaches", associated_tags: { CityGrid: [16220] }},
   {name: "National Parks", associated_tags: { CityGrid: [25980] }},
   {name: "Hiking Trails", associated_tags: { CityGrid: [12554] }},
   {name: "Water Parks", associated_tags: { CityGrid: [102] }},
   {name: "Outdoors", associated_tags: { CityGrid: [4115] }},
   {name: "Attractions", associated_tags: { CityGrid: [75] }}
 ]; 

 var Categories = mongoose.model('Categories', categoriesSchema);
 
 categoriesArray.forEach(function(category){
    
   let newCategory = new Categories(category);
   newCategory.save(); 
 });

 module.exports = Categories;