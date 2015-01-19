var twilio = require('twilio');
var activityMapper = require('../controllers/mappers/ApiActivityMapper');

module.exports = function() {

  var Twilio = {};

  Twilio.helloWorld = function(name, callback) {
    callback(null, 'Hello ' + name);
  }

  Twilio.requestHandler = function(requestPayload, callback){
    //mudar alguma desta logica para o controller
    var twimlResp = twilio.TwimlResponse();
    
    //url tem de ser configuração global :)
    twimlResp.play("https://164991ea.ngrok.com/sounds/cookiemonster.mp3");
    twimlResp.say('Welcome to HookieMonster Workshop!');
    twimlResp.say('Hookie...! Hookie...! Uga uga uga uga uga uuuga uga uga', {
      voice:'woman',
      language:'en-gb'
    });

    var activity = JSON.stringify(activityMapper.Twilio(requestPayload));
    console.log(activity);

    //Broadcast activity using socket.io to all the clients! :D
    //Notifier.BroadcastAll(activity);

    callback(null, twimlResp.toString());
  }

  return Twilio;
}
