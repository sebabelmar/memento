'use strict';

angular.module('media').controller('MediaModalController', ['$scope', 'pic', 'user','$http',
  function($scope, pic, user, $http) {
    $scope.picture = pic
    $scope.memories = $scope.picture.memories

    var user = user

    console.log($scope.picture)
    console.log($scope.memories)

    if ($scope.picture.videoStandardUrl == ''){
      $scope.showPic = true
    }else{
      $scope.videoUrl = $scope.picture.videoStandardUrl
      $scope.showVideo = true
    }

    $scope.letsMemorie = function(){
      console.log('in post Memorie')
      console.log('this shit should work!')

      $http({
        method: "POST",
        url: "/media/memorie/" + pic._id,
        params: {"content": $scope.content}
      })

      // THIS NEED TO BE INSIDE THEN OR SUCESS
      console.log("Posted")
      $scope.memories.push({content: $scope.content})
      $scope.content = ''
    };


	}
]);
