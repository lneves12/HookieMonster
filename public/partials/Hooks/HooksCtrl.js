'use strict';

/* Controllers */

appControllers.controller('HooksCtrl', ['$scope', '$filter','HooksFactory', 'socketIO',
  function($scope, $filter, HooksFactory, socketIO) {

    $scope.twilios = [];
    $scope.dropboxes = [];
    $scope.gitHubs = [];
    $scope.trellos = [];

    socketIO.on('twilio', function(twilio){
      $scope.twilios.unshift(twilio);
    });

    socketIO.on('dropbox', function(dropbox){
      $scope.dropboxes.unshift(dropbox);
    });

    socketIO.on('gitHub', function(gitHub){
      $scope.gitHubs.unshift(gitHub);
    });

    socketIO.on('trello', function(trello){
      $scope.trellos.unshift(trello);
    });
}]);
