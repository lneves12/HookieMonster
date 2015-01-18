var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');

var register = function (plugin, options, next) {

  // ASSETS, JS, CSS, ETC.
  plugin.route({
      method: 'GET',
      path: '/partials/{path*}',
      config: controller.hookieAssets.partials
  });

  plugin.route({
    method: 'GET',
    path: '/css/{path*}',
    config: controller.hookieAssets.css
  });

  plugin.route({
    method: 'GET',
    path: '/js/{path*}',
    config: controller.hookieAssets.js
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
    handler: function (request, reply) {
      reply.view('index');
    }
  });
}

register.attributes = {
  name : 'hookieApi',
  version : '0.0.1'
}

module.exports = register;
