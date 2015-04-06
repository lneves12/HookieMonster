'use strict';

/* Controllers */

angular.module('hookieMonster')
// TODO 2: Injectar ao controller o modulo ngDialog
.controller('HooksCtrl', ['$scope', 'socketIO',
  function($scope, socketIO) {

    $scope.supportedHooks = ['twilio', 'dropbox', 'trello', 'hipchat'];
    $scope.activities = [];
    $scope.selectedHooks = {};

    $scope.supportedHooks.forEach(function(e) {
      socketIO.on(e, function(hook){
        $scope.activities.unshift(hook);
      });
      $scope.selectedHooks[e] = true;
    });

    $scope.filterHooks = function(value, index) {
        return value.source === undefined || $scope.selectedHooks[value.source];
    };

    // TODO 4: Função para abrir o detalhe
    $scope.open = function(activity){
      ngDialog.open({
        templateUrl: '../views/activityDetail-' + activity.source + '.html',
        controller: 'DetailCtrl',
        className: 'ngdialog ngdialog-theme-default dialog-' + activity.source,
        data: activity
      });
    }

}]);
