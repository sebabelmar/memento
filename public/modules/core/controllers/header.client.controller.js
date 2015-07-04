'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$modal','$http',
	function($scope, Authentication, Menus, $modal, $http) {
		$scope.authentication = Authentication;

    // Authenticated User
    var user = Authentication.user;

    //Modals for sign in and sign up
    $scope.openSignIn = function () {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/core/views/sign-in.client.view.html',
        controller: 'AuthenticationController',
        size: 'lg',
        resolve: {
          // items: function () {
          //   return $scope.items;
          // }
        }
      });
    };

    $scope.openSignUp = function () {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/core/views/sign-up.client.view.html',
        controller: 'AuthenticationController',
        size: 'lg',
        resolve: {
          // items: function () {
          //   return $scope.items;
          // }
        }
      });
    };

    // I need to move this to the User service
    // This hits users route and users.profile.controller
    var loadPics = function(user_id, instagram_id, token){
      $http({
        method: "GET",
        url: "/users/load_media",
        params: {"user_id": user_id, "instagram_id": instagram_id, 'token': token}
      }).then(function(res){
        console.log(res)
      });
    };

    // Exec on LOAD
    // Need a find a way to hit API one time.
    $scope.getPicsYo = function (){
      var instagram_id = user.providerData.id;
      var token = user.providerData.accessToken;
      loadPics(user._id, instagram_id, token);
    };

		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
