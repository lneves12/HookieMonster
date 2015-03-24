'use strict';

// Declare app level module which depends on filters, and services
angular.module('hookieMonster', [
    'ngRoute',
    'btford.socket-io',
    'ngAnimate',
    'angularMoment'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: '../views/hooks.html',
    controller: 'HooksCtrl'
  });

}]);
//TODO 1: Connect to the Hookie Monster server using socket.io
