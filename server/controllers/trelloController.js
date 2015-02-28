var config = require('getconfig');
var activityMapper = require('../controllers/mappers/ApiActivityMapper');

module.exports = function() {

  var TrelloController = {};

  TrelloController.registerCallback = function(){

    var linkBoard = "https://trello.com/b/xi9tTXWL/open";
    var linkCard = "https://trello.com/c/YLbFabpi";

    var request = require('request');
    request.post({url:"https://trello.com/1/tokens/" + config.trello.token + "/webhooks/?key=" + config.trello.key, 
      form: {description:'My first webhook', 
             callbackURL: "http://" + config.ngrok + ".ngrok.com/trelloCallback", 
             idModel: config.trello.idModel}}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      } else {
        console.log("ERRO" + error);
        console.log("RES" + JSON.stringify(response));
        console.log("BODY" + body);
      }
    })
  }

  TrelloController.inspectCallback = function(request, reply){
    console.log("changes");
    console.log(JSON.stringify(request.payload, null, 2));

    var activity = activityMapper.Trello(request.payload);
    console.log(activity);
    request.server.plugins.hapio.io.emit('trello' , activity);

    reply("ok!");
  }

  return TrelloController;
}
