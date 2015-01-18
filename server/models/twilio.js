var twilio = require('twilio');

module.exports = function() {

  var Twilio = {};

  Twilio.helloWorld = function(name, callback) {
    callback(null, 'Hello ' + name);
  }

  Twilio.requestHandler = function(requestPayload, callback){
    var twimlResp = twilio.TwimlResponse();
    twimlResp.say('Welcome to HookieMonster Workshop!');
    twimlResp.say('Hookie...! Hookie...! Uga uga uga uga uga uuuga uga uga', {
      voice:'woman',
      language:'en-gb'
    });

    //var activity = JSON.stringify(activityMapper.Twilio(request.payload));
    //console.log(activity);

    //Broadcast activity using socket.io to all the clients! :D
    //Notifier.BroadcastAll(activity);

    callback(null, twimlResp.toString());
  }

  return Twilio;
}
