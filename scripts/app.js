'use strict';

// Declare app level module which depends on filters, and services
angular.module('hookieMonster', [
    'ngRoute',
    'btford.socket-io',
    'ngAnimate',
    'angularMoment',
    // TODO 1: Adicionar o modulo ngDialog à app
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: '../views/hooks.html',
    controller: 'HooksCtrl'
  });

}]).
factory('socketIO', function(socketFactory){
  var myIoSocket = io.connect('https://hookiemonster.herokuapp.com/');

  var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
});
