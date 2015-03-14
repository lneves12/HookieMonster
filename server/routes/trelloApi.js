var Joi = require('joi');
var TrelloController = require('../controllers/trelloController')();

/** Trello Documentation **/
// https://trello.com/docs/gettingstarted/webhooks.html

var register = function (plugin, options, next) {

    plugin.expose(TrelloController);

    plugin.route({
      method: 'GET',
      path: '/registerWebHook',
      handler: TrelloController.registerCallback
    });

    plugin.route({
      method: 'GET',
      path: '/trelloCallback',
      handler: function(request,reply) {
        reply().code(200);
      }
    });

    plugin.route({
      method: 'POST',
      path: '/trelloCallback',
      handler: TrelloController.inspectCallback
    });

    next();
};


register.attributes = {
	name : 'trelloApi',
	version : '0.0.1'
}

module.exports = register;
