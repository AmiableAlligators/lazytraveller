
// for now, I can only assume that we saved some estimated duration data
// based on activity category(or tag). -> museum: 5 hours
const timeOptimization = (duration, locations) => {
  // you can go these places
  let result = [];
  // you have no time to go those places
  let notimeToGo = [];
  let accTime = 0;

  locations.forEach(obj => {
    accTime += obj.estimatedDuration;
    if (accTime < duration) {
      result.push(obj);
    } else {
      notimeToGo.push(obj);
    }
  })
  // the last element will be an array of places that you don't have time to go
  result.push(notimeToGo);

  return result;
};

// Unit of estimatedDuration: hours

// {name: "Museums", type: "city"}}, --estimatedDuration: 6
// {name: "Amusement Parks", type: "city"}},--estimatedDuration: 4
// {name: "Aquariums", type: "city"}},--estimatedDuration: 3
// {name: "Zoos", type: "city"}},--estimatedDuration: 6
// {name: "Shopping Centers & Malls", type: "city"}},--estimatedDuration: 0.5
// {name: "Art Centers", type: "city"}},--estimatedDuration: 5
// {name: "Historical Sites", type: "city"}},--estimatedDuration: 3
// {name: "Cultural Centers", type: "city"}},--estimatedDuration: 3
// {name: "Botanical Gardens", type: "outdoor"}},--estimatedDuration: 2
// {name: "Hot Springs", type: "outdoor"}},--estimatedDuration: 8
// {name: "Beaches", type: "outdoor"}},--estimatedDuration: 4
// {name: "National Parks", type: "outdoor"}},--estimatedDuration: 8
// {name: "Hiking Trails", type: "outdoor"}},--estimatedDuration: 4
// {name: "Water Parks", type: "outdoor"}},--estimatedDuration: 3
// {name: "Outdoors", type: "outdoor"}},--estimatedDuration: 4
// {name: "Attractions", type: "city"}}--estimatedDuration: 2
