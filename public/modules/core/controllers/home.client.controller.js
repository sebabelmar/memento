'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

    // Authenticated User
    var user = Authentication.user;

    // I need to move this to the User service
    var loadPics = function(user_id, token){
      $http({
        method: "GET",
        url: "/users/load_media",
        params: {"user_id": user_id, "token": token}
      }).then(function(res){
        console.log(res)
      });
    }

    // Function available on Scope to sync with Instagram
    $scope.getPicsYo = function (){
      var token = user.providerData.accessToken;
      loadPics(user._id, token);
    };
	}

]);
