'use strict';

angular.module('media').controller('MediaModalController', ['$scope', 'pic',
  function($scope, pic) {
    $scope.picture = pic

    if ($scope.picture.videoStandardUrl == ''){
      $scope.showPic = true
    }else{
      $scope.videoUrl = $scope.picture.videoStandardUrl
      $scope.showVideo = true
    }

	}
]);
