var Joi = require('joi');
var GitHubController = require('../controllers/gitHubController')();

var register = function (plugin, options, next) {

    plugin.expose(GitHubController);

    //Declare a RESTful API
    plugin.route({
        method: 'GET',
        path: '/github/{name}',
        handler: GitHubController.helloWorld,
        config: {
          validate: {
            params: {
              name: Joi.string().min(3).max(10).required()
            }
          }
        }
    });
    next();
};

register.attributes = {
	name : 'gitHubApi',
	version : '0.0.1'
}

module.exports = register;
