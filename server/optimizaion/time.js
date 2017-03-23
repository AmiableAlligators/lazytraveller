
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
