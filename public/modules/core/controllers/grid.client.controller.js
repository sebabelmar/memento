'use strict';

angular.module('core').controller('GridController', ['$scope','$http', 'Authentication', 'Media', '$modal',
	function($scope, $http, Authentication, Media, $modal) {
        // Authenticated User
        var user = Authentication.user;

        // Profile modal
        var openProfileModal = function () {
          var modalInstance = $modal.open({
            templateUrl: 'modules/core/views/profile-modal.client.view.html',
            controller: 'SettingsController',
            size: 'lg',
            backdrop : 'static',
            keyboard: false,
          });
        }();

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
        };

        // Populate grid
        $scope.populateGrid = function (){
          getMedia(user._id);
        }();

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
