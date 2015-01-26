var Joi = require('joi');
var DropboxController = require('../controllers/dropboxController')();

var register = function (plugin, options, next) {

    plugin.expose(DropboxController);

    //Declare a RESTful API
    plugin.route({
      method: 'GET',
      path: '/dropbox',
      handler: DropboxController.challenge,
      config: {
        validate: {
          query: {
            challenge: Joi.any().required()
          }
        }
      }
    });
    
    plugin.route({
      method: 'GET',
      path: '/dropboxTest',
      handler: DropboxController.emitRandomStuff
    });

    plugin.route({
      method: 'POST',
      path: '/dropbox',
      handler: DropboxController.logStuff
    });

    next();
};


register.attributes = {
	name : 'dropboxApi',
	version : '0.0.1'
}

module.exports = register;
