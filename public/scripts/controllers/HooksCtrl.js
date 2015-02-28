'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', '$filter','socketIO',
  function($scope, $filter, socketIO) {

    $scope.activities = [];

    socketIO.on('twilio', function(twilio){
      $scope.activities.unshift(twilio);
    });

    socketIO.on('userConnected', function(userName){
      $scope.activities.unshift({userName:userName, me:false});
    });

    socketIO.on('youConnected', function(userName){
      $scope.activities.unshift({userName:userName, me:true});
    });

    socketIO.on('nUsers', function(nUsers){
      $scope.nUsers = nUsers;
    });

    socketIO.on('dropbox', function(dropbox){
      $scope.activities.unshift(dropbox);
    });

    socketIO.on('gitHub', function(gitHub){
      $scope.activities.unshift(gitHub);
    });

    socketIO.on('trello', function(trello){
      $scope.activities.unshift(trello);
    });

    socketIO.on('hipchat', function(hipchat){
      $scope.activities.unshift(hipchat);
    });

    $scope.submit = function(userName){
      $scope.userLoggedIn = true;
      socketIO.emit('userConnected', userName);
    }
}]);
