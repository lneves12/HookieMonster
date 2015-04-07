'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('HooksCtrl', ['$scope', 'socketIO', 'ngDialog',
  function($scope, socketIO, ngDialog) {

    $scope.supportedHooks = ['twilio', 'dropbox', 'trello', 'hipchat'];
    $scope.activities = [];
    $scope.selectedHooks = {};
    
    $scope.user = {name: '' , mail: ''};

    $scope.supportedHooks.forEach(function(e) {
      socketIO.on(e, function(hook){
        $scope.activities.unshift(hook);
      });
      $scope.selectedHooks[e] = true;
    });

    $scope.filterHooks = function(value, index) {
        return value.source === undefined || $scope.selectedHooks[value.source];
    };

    $scope.open = function(activity){
      ngDialog.open({
        templateUrl: '../views/activityDetail-' + activity.source + '.html',
        controller: 'DetailCtrl',
        className: 'ngdialog ngdialog-theme-default dialog-' + activity.source,
        data: activity
      });
    }

    $scope.submit = function(){
      $scope.userLoggedIn = true;
      $scope.user.name = $scope.user.name || "HookieMonster"
      $scope.user.mail = $scope.user.mail || "No gravatar mail"
      var cryptMail = CryptoJS.MD5($scope.user.mail );
      $scope.gravatarURL = "http://www.gravatar.com/avatar/" + cryptMail + "?size=400&d=http%3A%2F%2Fi.imgur.com%2F2WJrQ6l.jpg"
    }

}]);
