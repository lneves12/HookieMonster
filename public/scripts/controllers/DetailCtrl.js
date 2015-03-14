'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('DetailCtrl', ['$scope',
  function($scope) {
    $scope.activity = $scope.ngDialogData || "No Value...";
}]);
