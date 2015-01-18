var Twilio = require('../models/twilio')();

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
    });
  }

  return TwilioController;

}
