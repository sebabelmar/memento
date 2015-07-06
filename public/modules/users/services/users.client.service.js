'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			},
      createInvitationCode: {
        method: "PUT",
          url: "/users/create_invitation_code",
          params: {"user": user}
      }
		});
	}
]);