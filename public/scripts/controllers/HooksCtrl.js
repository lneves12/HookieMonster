'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', 'socketIO',
  function($scope, socketIO) {

    $scope.activities = [];
    $scope.user = {};

    socketIO.on('twilio', function(twilio){
      $scope.activities.unshift(twilio);
    });

    socketIO.on('userConnected', function(userName){
      $scope.activities.unshift({userName:userName, me:false, date: new Date()});
    });

    socketIO.on('youConnected', function(userName){
      $scope.activities.unshift({userName:userName, me:true, date: new Date()});
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

    $scope.submit = function(user){
      $scope.userLoggedIn = true;
      var cryptMail = CryptoJS.MD5(user.mail || "default");
      $scope.gravatarURL = "http://www.gravatar.com/avatar/" + cryptMail + "?size=400&d=http%3A%2F%2Fi.imgur.com%2F2WJrQ6l.jpg"
      socketIO.emit('userConnected', user.name || "HookieMonster");
    }

    socketIO.on('twilioToken', function(twilioToken){
      Twilio.Device.setup(twilioToken);
    });
}]);
