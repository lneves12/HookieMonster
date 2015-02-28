var Joi = require('joi');
var HipchatController = require('../controllers/hipchatController')();

var register = function (plugin, options, next) {

    plugin.expose(HipchatController);

    plugin.route({
      method: ['GET','POST'],
      path: '/hipchat',
      handler: HipchatController.incomingMessage,
    });

    next();
};


register.attributes = {
	name : 'hipchatApi',
	version : '0.0.1'
}

module.exports = register;
