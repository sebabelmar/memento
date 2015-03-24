'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var media = require('../../app/controllers/media.server.controller');

	// Media Routes
	app.route('/media')
		.get(media.list)
		.post(users.requiresLogin, media.create);

	app.route('/media/:mediumId')
		.get(media.read)
		.put(users.requiresLogin, media.hasAuthorization, media.update)
		.delete(users.requiresLogin, media.hasAuthorization, media.delete);

app.route('/media/memorie/:mediumId').post(media.memorie);

	// Finish by binding the Medium middleware
	app.param('mediumId', media.mediumByID);
};
