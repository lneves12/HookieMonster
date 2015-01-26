var hapio = require('hapio');
var config = require('getconfig');
var twilio = require('twilio');
var TwilioModel = require('../models/twilio')();
var activityMapper = require('../controllers/mappers/ApiActivityMapper');

module.exports = function() {

  var TwilioController = {};

  TwilioController.helloWorld = function(request, reply){
    TwilioModel.helloWorld(request.params.name, function(err, result){
      if(err) throw err;
      reply(result).code(200).header('message', 'Hello World');

    });
  }

  TwilioController.incomingCall = function(request, reply){

    var twimlResp = twilio.TwimlResponse();

    //url tem de ser configuração global :)
    twimlResp.play('https://' + config.ngrok + '.ngrok.com/sounds/cookiemonster.mp3');
    twimlResp.say('Welcome to HookieMonster Workshop!');
    twimlResp.say('Hookie...! Hookie...! Uga uga uga uga uga uuuga uga uga', {
      voice:'woman',
      language:'en-gb'
    });

    reply(twimlResp.toString()).code(200).header('message', 'Twilio message');

    //Broadcast to all clientes! isto tem de ser tudo mudado martelada...
    //O ideal seria criar um especie de dependece injection que injecte este IO aqui
    // com apenas os sockets que este pedido tem de fazer broadcast
    var activity = activityMapper.Twilio(request.payload);
    console.log(activity);
    request.server.plugins.hapio.io.emit('twilio' , activity);
  }

  return TwilioController;

}
