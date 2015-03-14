var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');

var register = function (plugin, options, next) {

  // ASSETS, JS, CSS, ETC.
  plugin.route({
      method: 'GET',
      path: '/scripts/{path*}',
      config: controller.hookieAssets.scripts
  });

  plugin.route({
    method: 'GET',
    path: '/styles/{path*}',
    config: controller.hookieAssets.styles
  });

  plugin.route({
    method: 'GET',
    path: '/sounds/{path*}',
    config: controller.hookieAssets.sounds
  });

  plugin.route({
    method: 'GET',
    path: '/images/{path*}',
    config: controller.hookieAssets.images
  });

  plugin.route({
    method: 'GET',
    path: '/views/{path*}',
    config: controller.hookieAssets.views
  });

  plugin.route({
    method: 'GET',
    path: '/bower_components/{path*}',
    config: controller.hookieAssets.bower
  });

  //Register Angular route
  plugin.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
      reply.view('index');
    }
  });

  //Register Angular route
  plugin.route({
    method: 'GET',
    path: '/testEvents',
    handler: function(request, reply){
      reply().code(200);
      request.server.plugins.hapio.io.emit('trello' , {"source":"trello","user":{"name":"test"},"message":"event tested","date":"2015-03-14T16:48:55.072Z","img":"trello.jpg","detail":{"message":"detailMessage"}});
      request.server.plugins.hapio.io.emit('twilio' , {"source":"twilio","user":{"name":"test"},"message":"event tested","date":"2015-03-14T16:48:55.072Z","img":"twilio.jpg","detail":{"message":"detailMessage"}});
      request.server.plugins.hapio.io.emit('hipchat' , {"source":"hipchat","user":{"name":"test"},"message":"event tested","date":"2015-03-14T16:48:55.072Z","img":"hipchat.jpg","detail":{"message":"detailMessage"}});
      request.server.plugins.hapio.io.emit('dropbox' , {"source":"dropbox","user":{"name":"test"},"message":"event tested","date":"2015-03-14T16:48:55.072Z","img":"dropbox.jpg","detail":{"message":"detailMessage"}});
    }
  });

  next();
}

register.attributes = {
  name : 'hookieApi',
  version : '0.0.1'
}

module.exports = register;
