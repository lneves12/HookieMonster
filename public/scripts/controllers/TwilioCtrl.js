'use strict';

/* Controllers */

angular.module('hookieMonster')
.controller('TwilioCtrl', ['$scope', '$filter', 'socketIO',
  function($scope, $filter, socketIO) {

    socketIO.on('twilioToken', function(twilioToken){
      Twilio.Device.setup(twilioToken);
    });

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
      if($scope.chamada!=undefined){
        $scope.chamada.accept();
      }
    }

    $scope.hangup = function(){
      Twilio.Device.disconnectAll();
    }



}]);
