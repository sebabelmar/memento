'use strict';

angular.module('core').controller('GridController', ['$scope','$http', 'Authentication', 'Media',
	function($scope, $http, Authentication, Media) {

    // Authenticated User
    var user = Authentication.user;

    // I need to move this to the User service
    var loadPics = function(user_id, instagram_id){
      $http({
        method: "GET",
        url: "/users/load_media",
        params: {"user_id": user_id, "instagram_id": instagram_id}
      }).then(function(res){
        console.log(res)
      });
    }

    // This should live in media service with media routes
    var getMedia = function(id){
      $http({
        method: "GET",
        url: "/users/find_media",
        params: {"user_id": id}
      }).then(function(response){
        $scope.media = response.data
        debugger;
      });
    }

    // Function available on Scope to sync with Instagram
    $scope.getPicsYo = function (){
      var instagram_id = user.providerData.data.id;
      loadPics(user._id, instagram_id);
    };

    // Populate grid
    $scope.populateGrid = function (){
      getMedia(user._id);
    };

	}
]);
