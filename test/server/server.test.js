require = require('really-need');
var request = require('supertest');
var expect = require('chai').expect;

describe('Server Tests: ', function() {
	var server;
	// setting up a new server for each test
	beforeEach(function() {
		server = require('./server/server.js', { bustCache: true });
	});
	afterEach(function(done) {
		server.close(done);
	});

	describe('API routes', function() {
	});
});
