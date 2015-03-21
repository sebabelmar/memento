'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Medium = mongoose.model('Medium'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, medium;

/**
 * Medium routes tests
 */
describe('Medium CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Medium
		user.save(function() {
			medium = {
				name: 'Medium Name'
			};

			done();
		});
	});

	it('should be able to save Medium instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medium
				agent.post('/media')
					.send(medium)
					.expect(200)
					.end(function(mediumSaveErr, mediumSaveRes) {
						// Handle Medium save error
						if (mediumSaveErr) done(mediumSaveErr);

						// Get a list of Media
						agent.get('/media')
							.end(function(mediaGetErr, mediaGetRes) {
								// Handle Medium save error
								if (mediaGetErr) done(mediaGetErr);

								// Get Media list
								var media = mediaGetRes.body;

								// Set assertions
								(media[0].user._id).should.equal(userId);
								(media[0].name).should.match('Medium Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Medium instance if not logged in', function(done) {
		agent.post('/media')
			.send(medium)
			.expect(401)
			.end(function(mediumSaveErr, mediumSaveRes) {
				// Call the assertion callback
				done(mediumSaveErr);
			});
	});

	it('should not be able to save Medium instance if no name is provided', function(done) {
		// Invalidate name field
		medium.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medium
				agent.post('/media')
					.send(medium)
					.expect(400)
					.end(function(mediumSaveErr, mediumSaveRes) {
						// Set message assertion
						(mediumSaveRes.body.message).should.match('Please fill Medium name');
						
						// Handle Medium save error
						done(mediumSaveErr);
					});
			});
	});

	it('should be able to update Medium instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medium
				agent.post('/media')
					.send(medium)
					.expect(200)
					.end(function(mediumSaveErr, mediumSaveRes) {
						// Handle Medium save error
						if (mediumSaveErr) done(mediumSaveErr);

						// Update Medium name
						medium.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Medium
						agent.put('/media/' + mediumSaveRes.body._id)
							.send(medium)
							.expect(200)
							.end(function(mediumUpdateErr, mediumUpdateRes) {
								// Handle Medium update error
								if (mediumUpdateErr) done(mediumUpdateErr);

								// Set assertions
								(mediumUpdateRes.body._id).should.equal(mediumSaveRes.body._id);
								(mediumUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Media if not signed in', function(done) {
		// Create new Medium model instance
		var mediumObj = new Medium(medium);

		// Save the Medium
		mediumObj.save(function() {
			// Request Media
			request(app).get('/media')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Medium if not signed in', function(done) {
		// Create new Medium model instance
		var mediumObj = new Medium(medium);

		// Save the Medium
		mediumObj.save(function() {
			request(app).get('/media/' + mediumObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', medium.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Medium instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medium
				agent.post('/media')
					.send(medium)
					.expect(200)
					.end(function(mediumSaveErr, mediumSaveRes) {
						// Handle Medium save error
						if (mediumSaveErr) done(mediumSaveErr);

						// Delete existing Medium
						agent.delete('/media/' + mediumSaveRes.body._id)
							.send(medium)
							.expect(200)
							.end(function(mediumDeleteErr, mediumDeleteRes) {
								// Handle Medium error error
								if (mediumDeleteErr) done(mediumDeleteErr);

								// Set assertions
								(mediumDeleteRes.body._id).should.equal(mediumSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Medium instance if not signed in', function(done) {
		// Set Medium user 
		medium.user = user;

		// Create new Medium model instance
		var mediumObj = new Medium(medium);

		// Save the Medium
		mediumObj.save(function() {
			// Try deleting Medium
			request(app).delete('/media/' + mediumObj._id)
			.expect(401)
			.end(function(mediumDeleteErr, mediumDeleteRes) {
				// Set message assertion
				(mediumDeleteRes.body.message).should.match('User is not logged in');

				// Handle Medium error error
				done(mediumDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Medium.remove().exec();
		done();
	});
});