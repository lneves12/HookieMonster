var Hapi = require('hapi');
var config = require('getconfig');
var twilio = require('twilio');


var twilioApi = require('./server/routes/twilioApi');
var gitHubApi = require('./server/routes/gitHubApi');
var hookieApi = require('./server/routes/hookieApi');
var dropboxApi = require('./server/routes/dropboxApi');
var trelloApi = require('./server/routes/trelloApi');
var hipchatApi = require('./server/routes/hipchatApi');

var hookieController = require('./server/controllers/hookieController');


// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: config.http.listen,
    port: config.http.port
});

server.views({
  path: './server/views',
  engines: {
    html: require('handlebars')
  }
});

//Register Socket.io
server.register(require('hapio'), function(err){
  if(err) throw err;
});

var io = server.plugins.hapio.io;
io.on('connection', function(socket) {
    console.log('User connect');

    socket.on('userConnected', function(userName){
      hookieController.addClient(socket);
      socket.emit('youConnected' , userName); //emit to the original sender
      socket.broadcast.emit('userConnected', userName); //emit to all other senders
      io.emit('nUsers', hookieController.clients.length);

      var capability = new twilio.Capability(config.TwilioAccountSID, config.TwilioAuthToken);
      capability.allowClientIncoming(socket.id);
      server.plugins.hapio.io.emit('twilioToken', capability.generate());

      console.log(userName + ' has connected');
    });

    socket.on('disconnect', function () {
      hookieController.removeClient(socket);
      socket.emit('nUsers', hookieController.clients.length);
    });

});


//Register the API
server.register([dropboxApi, twilioApi, gitHubApi, trelloApi, hipchatApi, hookieApi], function (err) {
  if(err) throw err;
});

// Start the server
server.start(function (err) {
  if(err) throw err;
  console.log('Server started at: ' + server.info.uri);
});
