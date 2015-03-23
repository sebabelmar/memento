'use strict';

angular.module('core').controller('GridController', ['$scope','$http', 'Authentication', 'Media', '$modal',
	function($scope, $http, Authentication, Media, $modal) {

    // Authenticated User
    var user = Authentication.user;

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
    }

    // This should live in media service with media routes
    // This hits users route and users.profile.controller
    var getMedia = function(id){
      $http({
        method: "GET",
        url: "/users/find_media",
        params: {"user_id": id}
      }).then(function(response){
        $scope.media = response.data
        console.log($scope.media);
      });
    }

    // Function available on Scope to sync with Instagram
    $scope.getPicsYo = function (){
      var instagram_id = user.providerData.data.id;
      var token = user.providerData.accessToken;
      loadPics(user._id, instagram_id, token);
    };

    // Populate grid
    $scope.populateGrid = function (){
      getMedia(user._id);
    };

    // Pop-up the modal
    $scope.showInfoModal = function(pic){
      var modalInstance = $modal.open({
        // template: "<div>Message goes here...<button >Continue</button></div>"
        templateUrl: '/modules/media/views/media-modal.client.view.html',
        controller: "MediaModalController",
        // windowClass: 'mdModal',
        size: 'lg',
        resolve: {
          user: function(){
            return user
          },
          pic: function(){
            return pic
          }
        }
      })
    }
	}
]);
