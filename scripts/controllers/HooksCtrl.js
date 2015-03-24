'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', 'socketIO',
  function($scope, socketIO) {
    $scope.supportedHooks = ['twilio', 'dropbox', 'trello', 'hipchat'];
    $scope.activities = [];
    // TODO 2: Initialize array

    $scope.supportedHooks.forEach(function(e) {
      socketIO.on(e, function(hook){
        $scope.activities.unshift(hook);
      });
      // TODO 3: Initialize values as true

    });

    // TODO 4: Filters function


}]);
