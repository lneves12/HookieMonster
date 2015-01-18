var GitHub = require('../models/gitHub')();

module.exports = function() {

  var GitHubController = {};

  GitHubController.helloWorld = function(request, reply){
    GitHub.helloWorld(request.params.name, function(err, result){
      if(err) throw err;
      reply(result).code(200).header('message', 'Hello World');
    });
  }

  return GitHubController;

}
