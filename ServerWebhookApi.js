var Hapi = require('hapi');
var twilio = require('twilio');
var activityMapper = require('./ApiActivityMapper');

var server = new Hapi.Server();
server.connection({host: process.env.IP , port: process.env.PORT });

var twilioRequestHandler = function (request, reply) {
        var twimlResp = twilio.TwimlResponse();
        twimlResp.say('Welcome to HookieMonster Workshop!');
        twimlResp.say('Hookie...! Hookie...! Uga uga uga uga uga uuuga uga uga', {
            voice:'woman',
            language:'en-gb'
        });
        reply(twimlResp.toString());

        var activity = JSON.stringify(activityMapper.Twilio(request.payload));
        console.log(activity);
        
        //Broadcast activity using socket.io to all the clients! :D
        //Notifier.BroadcastAll(activity);
}

var gmailRequestHandler = function(request, reply){
    //to bo implemented...
}

server.route([
    {
    method: ['GET' , 'POST' ],
    path: '/Twilio',
    handler: twilioRequestHandler
    },
    {
    method: ['GET' , 'POST' ],
    path: '/Gmail',
    handler: gmailRequestHandler
    }
]);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});