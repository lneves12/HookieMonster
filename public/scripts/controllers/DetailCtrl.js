'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('DetailCtrl', ['$scope',
  function($scope) {
    $scope.val = $scope.ngDialogData || "No Value...";
}]);
