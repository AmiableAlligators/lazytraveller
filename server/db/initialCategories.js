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
		{name: "Museums", type: "city", associated_tags: { CityGrid: [96], Yelp: ['museums'] }},
		{name: "Amusement Parks", type: "city", associated_tags: { CityGrid: [76], Yelp: ['amusementparks'] }},
		{name: "Aquariums", type: "city", associated_tags: { CityGrid: [77], Yelp: ['aquariums'] }},
		{name: "Zoos", type: "city", associated_tags: { CityGrid: [103], Yelp: ['zoos'] }},
		{name: "Shopping Centers & Malls", type: "city", associated_tags: { CityGrid: [6229], Yelp: ['shoppingcenters'] }},
		{name: "Historical Sites", type: "city", associated_tags: { CityGrid: [91], Yelp: ['landmarks'] }},
		{name: "Cultural Centers", type: "city", associated_tags: { CityGrid: [87], Yelp: ['culturalcenter'] }},
		{name: "Botanical Gardens", type: "outdoor", associated_tags: { CityGrid: [81], Yelp: ['gardens'] }},
		{name: "Hot Springs", type: "outdoor", associated_tags: { CityGrid: [93], Yelp: ['hotsprings'] }},
		{name: "Beaches", type: "outdoor", associated_tags: { CityGrid: [16220], Yelp: ['beaches'] }},
		{name: "National Parks", type: "outdoor", associated_tags: { CityGrid: [25980], Yelp: ['museums'] }},
		{name: "Hiking Trails", type: "outdoor", associated_tags: { CityGrid: [12554], Yelp: ['hiking'] }},
		{name: "Water Parks", type: "outdoor", associated_tags: { CityGrid: [102], Yelp: ['waterparks'] }},
	]
);

		// {name: "Art Centers", type: "city", associated_tags: { CityGrid: [71], Yelp: ['museums'] }},
		// {name: "Outdoors", type: "outdoor", associated_tags: { CityGrid: [4115], Yelp: [] }},
		// {name: "City Activities", type: "city", associated_tags: { CityGrid: [96, 76, 77, 103, 6229, 91, 87] }},
		// {name: "Attractions", type: "city", associated_tags: { CityGrid: [75], Yelp: [] }}