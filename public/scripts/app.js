'use strict';


// Declare app level module which depends on filters, and services
angular.module('hookieMonster', [
    'ngRoute',
    'btford.socket-io',
    'ngAnimate'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: '../views/hooks.html',
    controller: 'HooksCtrl'
  });

}]).
factory('socketIO', function(socketFactory){
  return socketFactory();
});
