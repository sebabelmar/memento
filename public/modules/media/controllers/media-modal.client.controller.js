'use strict';

angular.module('media').controller('MediaModalController', ['$scope', '$modalInstance', '$rootScope', 'pic', 'user','$http',
  function($scope, $modalInstance, $rootScope, pic, user, $http) {

    // Scope Variables
    $scope.picture = pic
    $scope.memories = $scope.picture.memories
    $scope.user = user

    // For debugging porpuses
    console.log($scope.user)
    console.log($scope.memories)

    // Shows link to video
    if ($scope.picture.videoStandardUrl == ''){
      $scope.showPic = true
    }else{
      $scope.videoUrl = $scope.picture.videoStandardUrl
      $scope.showVideo = true
    }

    // Add memories to an specific picture
    $scope.letsMemorie = function(){
      $http({
        method: "POST",
        url: "/media/memorie/" + pic._id,
        params: {"content": $scope.content}
      })

      // After http as an ajax this should be inside a call back, WEAK CODE!
      console.log("Posted")
      $scope.memories.push({content: $scope.content, created: Date.now()})
      $scope.content = ''
    };
	}
]);
