'use strict';

angular.module('media').controller('MediaModalController', ['$scope', '$modalInstance', '$rootScope', 'pic', 'user','$http',
  function($scope, $modalInstance, $rootScope, pic, user, $http) {
    $scope.picture = pic
    $scope.memories = $scope.picture.memories

    $scope.user = user

    console.log($scope.user)
    console.log($scope.memories)

    if ($scope.picture.videoStandardUrl == ''){
      $scope.showPic = true
    }else{
      $scope.videoUrl = $scope.picture.videoStandardUrl
      $scope.showVideo = true
    }

    $scope.letsMemorie = function(){
      $http({
        method: "POST",
        url: "/media/memorie/" + pic._id,
        params: {"content": $scope.content}
      })

      // THIS NEED TO BE INSIDE THEN OR SUCESS
      console.log("Posted")
      $scope.memories.push({content: $scope.content, created: Date.now()})
      $scope.content = ''
    };


	}
]);
