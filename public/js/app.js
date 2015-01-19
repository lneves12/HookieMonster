'use strict';


// Declare app level module which depends on filters, and services
angular.module('hookieMonster', [
    'ngRoute',
    'btford.socket-io',
    'hookieMonster.filters',
    'hookieMonster.services',
    'hookieMonster.directives',
    'hookieMonster.controllers'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'partials/Hooks/hooks.html',
    controller: 'HooksCtrl'
  });

}]).
factory('socketIO', function(socketFactory){
  return socketFactory();
});
