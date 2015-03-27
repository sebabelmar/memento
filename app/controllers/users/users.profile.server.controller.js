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
	https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=
	var url =  "https://api.instagram.com/v1/users/" + req.param('instagram_id') + "/media/recent/?access_token=" + req.param('token');
	console.log("vamos bien")
	console.log(req.param('instagram_id'))
	console.log(url)

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
	console.log(media)
	var createdAt = new Date(media.created_time*1000)
	if(media.type == 'image'){
		var lowResUrl = media.images.low_resolution.url;
		var thumbnail = media.images.thumbnail.url;
		var standardUrl = media.images.standard_resolution.url;
		var videoStandardUrl = '';
		var videoLowUrl = '';

	}else{
		var lowResUrl = media.images.low_resolution.url;
		var thumbnail = media.images.thumbnail.url;
		var standardUrl = media.images.standard_resolution.url;
		var videoStandardUrl = media.videos.low_resolution.url;
		var videoLowUrl = media.videos.standard_resolution.url;
	}


	var media = new Media ({
		title: "Seba",
		takenAt: createdAt,
		tags : media.tags,
		mediaType: media.type,
		location: media.location,
		imageLowResUrl: lowResUrl,
		imageThumbnail: thumbnail,
		imageStandardUrl: standardUrl,
		videoStandardUrl: videoStandardUrl,
		videoLowUrl: videoLowUrl,
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
		var userId = new ObjectId(req.param('user_id'));
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
