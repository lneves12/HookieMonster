'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', 'socketIO',
  function($scope, socketIO) {
    
    $scope.supportedHooks = ['twilio', 'dropbox', 'trello', 'hipchat'];
    $scope.activities = [];
    $scope.selectedHooks = {};

    $scope.supportedHooks.forEach(function(e) {
      socketIO.on(e, function(hook){
        $scope.activities.unshift(hook);
      });
      $scope.selectedHooks[e] = DEFAULT_FILTERS_START;
    });

    $scope.filterHooks = function(value, index) {
        return value.source === undefined || $scope.selectedHooks[value.source];
    };

}]);
