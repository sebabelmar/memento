'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	request = require('request'),
	User = mongoose.model('User'),
	Media = mongoose.model('Medium'),
	ObjectId = require('mongoose').Types.ObjectId;

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
	var url =  "https://api.instagram.com/v1/users/" + req.param('instagram_id') + "/media/recent/?client_id=aab5e63dbef24de2a92288f892bd5c77";
	console.log("vamos bien")
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
			var instagramPics = JSON.parse(body);
			var user_id = req.param('user_id');
			console.log("user_id");

			iterateOverResponse(instagramPics.data, user_id)
			return res.json(200)
	  }else{
	  	console.log("algo anda mal!");
	  }
	})
};

var iterateOverResponse = function(collection, userId){
	for( var i = 0; i < collection.length; i++ ) {
	    saveMedia(collection[i], userId);
	}
}

var saveMedia = function(media, userId){
	if(media.type == 'image'){
		var lowResUrl = media.images.low_resolution.url
		var thumbnail = media.images.thumbnail.url
		var standardUrl = media.images.standard_resolution.url
	}else{
		var lowResUrl = media.videos.low_resolution.url
		var thumbnail = media.images.standard_resolution.url
		var standardUrl = media.videos.standard_resolution.url
	}


	var media = new Media ({
		title: "Memorie",
		tags : media.tags,
		mediaType: media.type,
		location: media.location,
		lowResUrl: lowResUrl,
		thumbnail: thumbnail,
		standardUrl: standardUrl,
		instagramId: media.id,
		user: mongoose.Types.ObjectId(userId)
	});

	media.save(function (err) {
	  if (err) return console.log(err);
	  // saved!
	})
}


	/**
	 * Media of a user
	 */
	exports.findMedia = function(req, res){
		console.log(req.param('user_id'));
		var userId = new ObjectId(req.param('user_id'));
		console.log('userId');
		var query = Media.where({"user": userId});
		query.find(function(err, media) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				console.log("WIN")
				res.jsonp(media);
			}
		});
	};
