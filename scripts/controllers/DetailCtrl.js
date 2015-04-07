'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('DetailCtrl', ['$scope',
  function($scope) {
    $scope.activity = $scope.ngDialogData;

    var cryptMail = CryptoJS.MD5($scope.activity.detail.fromMail || '');
    $scope.gravatarURL = "http://www.gravatar.com/avatar/" + cryptMail + "?size=400&d=http%3A%2F%2Fs9.favim.com%2Forig%2F140102%2Fart-artsy-crazy-creative-Favim.com-1214952.jpg"
}]);
