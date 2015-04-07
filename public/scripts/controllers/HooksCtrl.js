'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', 'socketIO',
  function($scope, socketIO) {
    $scope.supportedHooks = ['twilio', 'dropbox', 'trello', 'hipchat'];

    $scope.activities = [];
    $scope.user = {name: '' , mail: ''};
    $scope.selectedHooks = {};
    $scope.isCallActive = false;

    $scope.supportedHooks.forEach(function(e) {
      socketIO.on(e, function(hook){
        $scope.activities.unshift(hook);
      });
      $scope.selectedHooks[e] = true;
    });

    socketIO.on('newUserConnected', function(userName, userSocketId){
      $scope.activities.unshift({userName:userName, me:false, date: new Date(), userId: userSocketId});
      $scope.user.id = userSocketId;
    });

    socketIO.on('youConnected', function(userName, twilioToken){
      $scope.activities.unshift({userName:userName, me:true, date: new Date()});
      Twilio.Device.setup(twilioToken);
      configureTwilio();
    });

    socketIO.on('nUsers', function(nUsers){
      $scope.nUsers = nUsers;
    });

    $scope.submit = function(){
      $scope.userLoggedIn = true;
      $scope.user.name = $scope.user.name || "HookieMonster"
      $scope.user.mail = $scope.user.mail || "No gravatar mail"
      var cryptMail = CryptoJS.MD5($scope.user.mail );
      $scope.gravatarURL = "http://www.gravatar.com/avatar/" + cryptMail + "?size=400&d=http%3A%2F%2Fi.imgur.com%2F2WJrQ6l.jpg"
      socketIO.emit('Submitted', $scope.user.name , $scope.user.mail);
    }

    $scope.filterHooks = function(value, index) {
        return value.source === undefined || $scope.selectedHooks[value.source];
    };

    $scope.answer = function(){
      if (typeof $scope.chamada.accept == 'function'){
        $scope.chamada.accept();
        setCallActive($scope.chamada, true, false);
      }
    }

    $scope.hangup = function(){
      Twilio.Device.disconnectAll();
      rejectCall($scope.chamada);
    }

    var configureTwilio = function() {
      $scope.chamada = {};

       Twilio.Device.incoming(function (conn) {
         setCallActive(conn, true, true);
      });

      Twilio.Device.error(function (error) {
        Twilio.Device.disconnectAll();
        rejectCall($scope.chamada);
      });

      Twilio.Device.disconnect(function (conn) {
        Twilio.Device.disconnectAll();
        rejectCall($scope.chamada);
      });

       Twilio.Device.cancel(function (conn) {
           Twilio.Device.disconnectAll();
           rejectCall($scope.chamada);
         });
    }

    var rejectCall = function(call) {
      if (typeof $scope.chamada.reject == 'function'){
        $scope.chamada.reject();
        setCallActive({}, false, false);
      }
    }

    var setCallActive = function(call, callActive, isRinging){
      $scope.chamada = call;
      $scope.isCallActive = callActive;
      $scope.isRinging = isRinging;

      $scope.$evalAsync();
    }

}]).
directive('activity', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/activity.html'
  }
});
