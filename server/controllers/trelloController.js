var config = require('getconfig');
var request = require('request');
var activityMapper = require('../controllers/mappers/ApiActivityMapper');

module.exports = function() {

  var TrelloController = {};

  TrelloController.registerCallback = function(){
    var requestParams = { url:"https://trello.com/1/tokens/" + config.trello.token + "/webhooks/?key=" + config.trello.key, 
                          form: { description:'My trello webhook', 
                                  callbackURL: config.url + "/trelloCallback", 
                                  idModel: config.trello.idModel
                          }
                        };
    request.post( requestParams, function (error, response, body) {
      if (error) throw err;
    });
  }

  TrelloController.inspectCallback = function(request, reply){
    console.log(JSON.stringify(request.payload, null, 2));


    request.server.plugins.hapio.io.emit('trello' , activityMapper.Trello(request.payload));
    reply();
  }

  return TrelloController;
}