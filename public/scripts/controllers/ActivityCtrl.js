'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('ActivityCtrl', ['$scope', 'socketIO', 'ngDialog', '$rootScope',
  function($scope, socketIO, ngDialog, $rootScope) {

    $scope.log = "HOOKIE MONSTER IS WAITING!";

    Twilio.Device.error(function (error) {
      $scope.chamada = {};
    });

    Twilio.Device.disconnect(function (conn) {
      $scope.chamada = {};
     });

     Twilio.Device.incoming(function (conn) {
       $scope.chamada = conn;
    });

    $scope.answer = function(){
      if($scope.chamada!==undefined){
        $scope.chamada.accept();
      }
    }

    $scope.hangup = function(){
      Twilio.Device.disconnectAll();
      $scope.chamada = {};
    }

    $scope.call = function(clientId, clientName) {
        var params = {"clientId": clientId , "clientName" : clientName};
        Twilio.Device.connect(params);
    }

    $scope.open = function(activity){
      ngDialog.open({
        templateUrl: '../views/activityDetail-' + activity.source + '.html',
        controller: 'DetailCtrl',
        className: 'ngdialog ngdialog-theme-default dialog-' + activity.source,
        data: activity
      });
    }

}]);
