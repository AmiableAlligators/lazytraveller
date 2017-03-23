/** Run this file only when you are first initializing MongoDB.
 * Instructions:
 * 1. In your terminal, go to the directory where this file is located.
 * 2. Open MongoDB shell with 'mongo'
 * 3. Load this file with 'load("initialCategories.js")'
 * 4. If the file was loaded successfully, you should see 'true'
 * 		You can also verify with db.categories.count(). Should be more than 0.
*/

// get our LazyTraveller database
db = db.getSiblingDB('lazytravellerdb');

db.categories.insert(
	[
		{name: "Museums", type: "city", associated_tags: { CityGrid: [96] }},
		{name: "Amusement Parks", type: "city", associated_tags: { CityGrid: [76] }},
		{name: "Aquariums", type: "city", associated_tags: { CityGrid: [77] }},
		{name: "Zoos", type: "city", associated_tags: { CityGrid: [103] }},
		{name: "Shopping Centers & Malls", type: "city", associated_tags: { CityGrid: [6229] }},
		{name: "Art Centers", type: "city", associated_tags: { CityGrid: [71] }},
		{name: "Historical Sites", type: "city", associated_tags: { CityGrid: [91] }},
		{name: "Cultural Centers", type: "city", associated_tags: { CityGrid: [87] }},
		{name: "Botanical Gardens", type: "outdoor", associated_tags: { CityGrid: [81] }},
		{name: "Hot Springs", type: "outdoor", associated_tags: { CityGrid: [93] }},
		{name: "Beaches", type: "outdoor", associated_tags: { CityGrid: [16220] }},
		{name: "National Parks", type: "outdoor", associated_tags: { CityGrid: [25980] }},
		{name: "Hiking Trails", type: "outdoor", associated_tags: { CityGrid: [12554] }},
		{name: "Water Parks", type: "outdoor", associated_tags: { CityGrid: [102] }},
		{name: "Outdoors", type: "outdoor", associated_tags: { CityGrid: [4115] }},
		{name: "Attractions", type: "city", associated_tags: { CityGrid: [75] }}
	]
);