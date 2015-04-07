var hapio = require('hapio');
var config = require('getconfig');
var twilio = require('twilio');
var TwilioModel = require('../models/twilio')();
var activityMapper = require('../controllers/mappers/ApiActivityMapper');
var hookieController = require('../controllers/hookieController');


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
    var payload = request.payload;
    console.log(payload);

    var randomSound = Math.floor(Math.random() * 8);
    twimlResp.play(config.url + '/sounds/' + randomSound + '.mp3');

    //TODO
    //falta passar mail e fazer integração com gravatar
    // tirar duplo click
    if(payload.From !== undefined && payload.From.indexOf("client") === 0) {
        //Call is coming from the browser so let's redirect it for the right client
        twimlResp.dial({}, function(node) {
            node.client(payload.clientId);
        });

        var activity = activityMapper.TwilioClient(request.payload);

    } else {
        //Call isn't coming from the browser so lets redirect it for everyone connected
        twimlResp.dial({}, function(node) {
          for (var key in hookieController.clients) {
            node.client(key);
        }
        });

        var activity = activityMapper.TwilioPhone(request.payload);
    }

    console.log(activity);
    request.server.plugins.hapio.io.emit('twilio' , activity);

    reply(twimlResp.toString()).code(200).header('message', 'Tilio message');
  }

  return TwilioController;

}
