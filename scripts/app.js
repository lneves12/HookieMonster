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

}]).
factory('socketIO', function(socketFactory){
  var myIoSocket = io.connect('https://154416.ngrok.com/');

  var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
});
