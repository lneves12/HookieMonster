'use strict';

/* Controllers */

appControllers.controller('HooksCtrl', ['$scope', '$filter','HooksFactory', 'socketIO',
  function($scope, $filter, HooksFactory, socketIO) {

    $scope.activities = [];

    $scope.gitHubs = [];
    $scope.trellos = [];

    socketIO.on('twilio', function(twilio){
      $scope.activities.unshift(JSON.parse(twilio));
    });

    socketIO.on('dropbox', function(dropbox){
      $scope.activities.unshift(JSON.parse(dropbox));
    });

    socketIO.on('gitHub', function(gitHub){
      $scope.gitHubs.unshift(gitHub);
    });

    socketIO.on('trello', function(trello){
      $scope.trellos.unshift(trello);
    });
}]);
