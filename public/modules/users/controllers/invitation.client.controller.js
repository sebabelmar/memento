'use strict';

angular.module('users').controller('InvitationController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

    // Update a user profile
    var updateUserProfile = function() {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);

        user.$update(function(response) {
          $scope.success = true;
          Authentication.user = response;
        }, function(response) {
          $scope.error = response.data.message;
        });
    };

    $scope.generateCode = function(){
      $scope.user.invitationCode = (0|Math.random()*9e6).toString(36);
      updateUserProfile();
    };

    $scope.addGuest = function(){
      $scope.user
    }

	}
]);