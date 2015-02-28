var Hapi = require('hapi');
var config = require('getconfig');


var twilioApi = require('./server/routes/twilioApi');
var gitHubApi = require('./server/routes/gitHubApi');
var hookieApi = require('./server/routes/hookieApi');
var dropboxApi = require('./server/routes/dropboxApi');
var trelloApi = require('./server/routes/trelloApi');


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


var nClients = 0;

var io = server.plugins.hapio.io;
io.on('connection', function(socket) {
    console.log('User connect');
    ++nClients;
    socket.on('user', function(user){
      io.emit('user' , user);
      io.emit('nUsers', nClients);
      console.log(user);
    });

    socket.on('disconnect', function () {
      --nClients;
      socket.emit('disconnected', nClients);
    });

});


//Register the API
server.register([dropboxApi, twilioApi, gitHubApi, trelloApi, hookieApi], function (err) {
  if(err) throw err;
});

// Start the server
server.start(function (err) {
  if(err) throw err;
  console.log('Server started at: ' + server.info.uri);
});
