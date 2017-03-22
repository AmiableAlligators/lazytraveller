
module.exports = (locations, priceLimitation) => {
  return locations.filter(obj => {
    return obj.price === 'free' || obj.price === null || (obj.price.indexOf('$') !== -1 && obj.price.split('').length <= priceLimitation);
  });
};
