'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Media = mongoose.model('Medium');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};

/**
 * Send User's pics
 */
exports.loadMedia = function(req, res){
	var url =  "https://api.instagram.com/v1/users/369004168/media/recent/?access_token=" + req.param('token');

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
			var instagramPics = JSON.parse(body);
			var user_id = req.param('user_id');

			iterateOverResponse(instagramPics.data, user_id)
			return res.json(200)
	  }
	})
};

var iterateOverResponse = function(collection, userId){
	for( var i = 0; i < collection.length; i++ ) {
	    saveMedia(collection[i], userId);
	}
}

var saveMedia = function(media, userId){
	var media = new Media ({
		title: "Memorie ",
		tags : media.tags,
		mediaType: media.type,
		location: media.location,
		lowResUrl: media.images.low_resolution.url,
		thumbnail: media.images.thumbnail.url,
		standardUrl: media.images.standard_resolution.url,
		instagramId: media.id,
		user: userId
	});

	media.save(function (err) {
	  if (err) return console.log(err);
	  // saved!
	})

}
