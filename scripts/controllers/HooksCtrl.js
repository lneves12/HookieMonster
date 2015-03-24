'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', 'socketIO',
  function($scope, socketIO) {
    $scope.supportedHooks = ['twilio', 'dropbox', 'trello', 'hipchat'];

    $scope.activities = [];

    $scope.supportedHooks.forEach(function(e) {
      socketIO.on(e, function(hook){
        $scope.activities.unshift(hook);
      });
    });

}]);
