'use strict';

/* Controllers */

appControllers.controller('HooksCtrl', ['$scope', '$filter','HooksFactory', 'socketIO',
  function($scope, $filter, HooksFactory, socketIO) {

    $scope.activities = [];

    socketIO.on('twilio', function(twilio){
      $scope.activities.unshift(twilio);
    });

    socketIO.on('user', function(user){
      $scope.activities.unshift(user);
    });

    socketIO.on('nUsers', function(nUsers){
      $scope.nUsers = nUsers;
    });

    socketIO.on('disconnected', function(nUsers){
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

    $scope.submit = function(userName){
      $scope.uuid = generateUUID();
      socketIO.emit('user', {name:userName, uuid: $scope.uuid});
    }

    var generateUUID = function() {
      function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
      }
      return _p8() + _p8(true) + _p8(true) + _p8();
    }
}]);
