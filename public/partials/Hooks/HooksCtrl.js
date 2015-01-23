'use strict';

/* Controllers */

appControllers.controller('HooksCtrl', ['$scope', '$filter','HooksFactory', 'socketIO',
  function($scope, $filter, HooksFactory, socketIO) {

    $scope.activities = [];

    socketIO.on('activity', function(activity){
      $scope.activities.push(activity);
    });
}]);
