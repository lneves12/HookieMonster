var Joi = require('joi');
var TwilioController = require('../controllers/twilioController')();

var register = function (plugin, options, next) {

    plugin.expose(TwilioController);

    //Declare a RESTful API
    plugin.route({
      method: 'GET',
      path: '/twilio/{name}',
      handler: TwilioController.helloWorld,
      config: {
        validate: {
          params: {
            name: Joi.string().min(3).max(10).required()
          }
        }
      }
    });

    plugin.route({
      method: 'POST',
      path: '/twilio',
      handler: TwilioController.incomingCall,
    });

    next();
};


register.attributes = {
	name : 'twilioApi',
	version : '0.0.1'
}

module.exports = register;
