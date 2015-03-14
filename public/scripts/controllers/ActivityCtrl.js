'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('ActivityCtrl', ['$scope', 'socketIO', 'ngDialog', '$rootScope',
  function($scope, socketIO, ngDialog, $rootScope) {

    $scope.log = "HOOKIE MONSTER IS WAITING!";

    Twilio.Device.ready(function (device) {
      $scope.log = "Ready";
    });

    Twilio.Device.error(function (error) {
      $scope.log = "Error: " + error.message;
    });

    Twilio.Device.connect(function (conn) {
      $scope.log = "Successfully established call";
    });

    Twilio.Device.disconnect(function (conn) {
      $scope.log = "Call ended";
     });

     Twilio.Device.incoming(function (conn) {
       $scope.log = "Incoming connection from " + conn.parameters.From;
       $scope.chamada = conn;
    });

    $scope.answer = function(){
      if($scope.chamada!==undefined){
        $scope.chamada.accept();
      }
    }

    $scope.hangup = function(){
      Twilio.Device.disconnectAll();
    }

    $scope.open = function(activity){
      ngDialog.open({
        templateUrl: '../views/activityDetail-' + activity.source + '.html',
        controller: 'DetailCtrl',
        className: 'ngdialog ngdialog-theme-default',
        data: activity
      });
    }

}]);
