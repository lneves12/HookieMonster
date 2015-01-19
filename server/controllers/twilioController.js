var hapio = require('hapio');
var Twilio = require('../models/twilio')();
var activityMapper = require('../controllers/mappers/ApiActivityMapper');

module.exports = function() {

  var TwilioController = {};

  TwilioController.helloWorld = function(request, reply){
    Twilio.helloWorld(request.params.name, function(err, result){
      if(err) throw err;
      reply(result).code(200).header('message', 'Hello World');

    });
  }

  TwilioController.requestHandler = function(request, reply){
    Twilio.requestHandler(request.payload, function(err, result){
      if(err) throw err;
      reply(result).code(200).header('message', 'Twilio message');

      //Broadcast to all clientes! isto tem de ser tudo mudado martelada...
      //O ideal seria criar um especie de dependece injection que injecte este IO aqui
      // com apenas os sockets que este pedido tem de fazer broadcast
      var activity = JSON.stringify(activityMapper.Twilio(request.payload));
      console.log(activity);
      request.server.plugins.hapio.io.emit('activity' , activity);
    });
  }

  return TwilioController;

}
