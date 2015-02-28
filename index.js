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


var clients = [];

var io = server.plugins.hapio.io;
io.on('connection', function(socket) {
    console.log('User connect');
    clients.push(socket);

    socket.on('userConnected', function(userName){
      socket.emit('youConnected' , userName); //emit to the original sender
      socket.broadcast.emit('userConnected', userName); //emit to all other senders
      io.emit('nUsers', clients.length);
      console.log(userName);
    });

    socket.on('disconnect', function () {
      var index = clients.indexOf(socket);
      if (index != -1) {
          clients.splice(index, 1);
          console.info('Client gone (id=' + socket.id + ').');
      }
      socket.emit('nUsers', clients.length);
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
