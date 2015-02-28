var config = require('getconfig');

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
        /*console.log("ERRO" + error);
        console.log("RES" + JSON.stringify(response));
        console.log("BODY" + body);*/
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    })
  }

  TrelloController.inspectCallback = function(request, reply){
    console.log("changes");
    console.log(JSON.stringify(request.payload));

    reply("ok!");
  }

  return TrelloController;
}
