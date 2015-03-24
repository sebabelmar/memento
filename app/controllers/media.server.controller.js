'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Medium = mongoose.model('Medium'),
	_ = require('lodash');

/**
 * Create a Medium
 */
exports.create = function(req, res) {
	var medium = new Medium(req.body);
	medium.user = req.user;

	medium.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medium);
		}
	});
};

/**
 * Show the current Medium
 */
exports.read = function(req, res) {
	res.jsonp(req.medium);
};

/**
 * Update a Medium
 */
exports.update = function(req, res) {
	var medium = req.medium ;

	medium = _.extend(medium , req.body);

	medium.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medium);
		}
	});
};

/**
 * Delete an Medium
 */
exports.delete = function(req, res) {
	var medium = req.medium ;

	medium.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medium);
		}
	});
};

/**
 * List of Media
 */
exports.list = function(req, res) {
	Medium.find().sort('-created').populate('user', 'displayName').exec(function(err, media) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(media);
		}
	});
};

exports.memorie = function(req, res) {
	cosole.log("in memorie")
}



/**
 * Medium middleware
 */
exports.mediumByID = function(req, res, next, id) {
	Medium.findById(id).populate('user', 'displayName').exec(function(err, medium) {
		if (err) return next(err);
		if (! medium) return next(new Error('Failed to load Medium ' + id));
		req.medium = medium ;
		next();
	});
};

/**
 * Medium authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.medium.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
