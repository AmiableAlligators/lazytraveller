const citygrid = require('./api/citygrid');
// const yelplibrary = require('./api/yelplibrary');

let libs = [
  citygrid
  // yelplibrary
];

const AppService = {
  find: function(queryObject) {
    lib.map(func => {
      func.fetch(queryObject);
    });

    return Promise.all(lib);
  },
};

module.exports = AppService;
