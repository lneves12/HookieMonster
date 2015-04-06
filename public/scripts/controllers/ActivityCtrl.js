'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('ActivityCtrl', ['$scope', 'socketIO', 'ngDialog', '$rootScope',
  function($scope, socketIO, ngDialog, $rootScope) {

    $scope.open = function(activity, teste){
      ngDialog.open({
        templateUrl: '../views/activityDetail-' + activity.source + '.html',
        controller: 'DetailCtrl',
        className: 'ngdialog ngdialog-theme-default dialog-' + activity.source,
        data: activity
      });
    }

    $scope.call = function(clientId, clientName) {
        var params = {"clientId": clientId , "clientName" : clientName};
        Twilio.Device.connect(params);
    }

}]);
