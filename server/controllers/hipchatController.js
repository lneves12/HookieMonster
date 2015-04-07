var hapio = require('hapio');
var config = require('getconfig');
var twilio = require('twilio');
var activityMapper = require('../controllers/mappers/ApiActivityMapper');
var hookieController = require('../controllers/hookieController');

module.exports = function() {

  var HipchatController = {};

  HipchatController.incomingMessage = function(request, reply){
      reply().code(200)

      var mail = "";

      for (var key in hookieController.clients) {
        if(hookieController.clients[key].name === request.payload.item.message.from.name){
          mail = hookieController.clients[key].mail;
        };
      }

      var activity = activityMapper.Hipchat(request.payload, mail);

      request.server.plugins.hapio.io.emit('hipchat' , activity);
  }

  return HipchatController;

}
