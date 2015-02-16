var requireDirectory = require('require-directory');
var controller = requireDirectory(module, '../controllers');
var HookieController = require('../controllers/HookieController')();

var register = function (plugin, options, next) {

  plugin.expose(HookieController);

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
    handler: HookieController.initPageAndTwilio
  });
}

register.attributes = {
  name : 'hookieApi',
  version : '0.0.1'
}

module.exports = register;
