'use strict';

/* Controllers */

appControllers.controller('HooksCtrl', ['$scope', '$filter','HooksFactory', 'socketIO',
  function($scope, $filter, HooksFactory, socketIO) {
    socketIO.on('activity', function(activity){
      $('#activity').prepend($('<li>').text(activity));
    });
}]);
