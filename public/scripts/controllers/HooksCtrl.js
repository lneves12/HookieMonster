'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', 'socketIO',
  function($scope, socketIO) {
    $scope.supportedHooks = ['twilio', 'dropbox', 'trello', 'hipchat'];

    $scope.activities = [];
    $scope.user = {};
    $scope.selectedHooks = {};

    $scope.supportedHooks.forEach(function(e) {
      socketIO.on(e, function(hook){
        $scope.activities.unshift(hook);
      });
      $scope.selectedHooks[e] = true;
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

    $scope.submit = function(){
      $scope.userLoggedIn = true;
      var cryptMail = CryptoJS.MD5($scope.user.mail || "default");
      $scope.gravatarURL = "http://www.gravatar.com/avatar/" + cryptMail + "?size=400&d=http%3A%2F%2Fi.imgur.com%2F2WJrQ6l.jpg"
      socketIO.emit('userConnected', $scope.user.name || "HookieMonster");
    }

    $scope.filterHooks = function(value, index) {
        return value.source === undefined || $scope.selectedHooks[value.source];
    };

    socketIO.on('twilioToken', function(twilioToken){
      Twilio.Device.setup(twilioToken);
    });
}]).
directive('activity', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/activity.html'
  }
});
