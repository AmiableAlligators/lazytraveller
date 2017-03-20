var assert = require('assert');
var expect = require('chai').expect;

// Import tests
import SearchViewTest from './SearchView.test.js';
import ShortlistView from './ShortlistView.test.js';
import LazyView from './LazyView.test.js';

// Server tests
import Server from './server/server.test.js';

describe('Tests are working?', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
