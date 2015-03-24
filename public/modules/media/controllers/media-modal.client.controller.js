'use strict';

angular.module('media').controller('MediaModalController', ['$scope', 'pic', 'user','$http',
  function($scope, pic, user, $http) {
    $scope.picture = pic
    var user = user

    if ($scope.picture.videoStandardUrl == ''){
      $scope.showPic = true
    }else{
      $scope.videoUrl = $scope.picture.videoStandardUrl
      $scope.showVideo = true
    }

    $scope.memorie = ''

    // var postMemorie = function(){
    //   $http({
    //     method: "POST",
    //     url: "/media/memorie/" + picture.id,
    //     params: {"user_id": id}
    //   }).then(function(response){
    //     console.log("Posted");
    //   });
    // }();


	}
]);
