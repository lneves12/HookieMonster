var hapio = require('hapio');
var config = require('getconfig');
var twilio = require('twilio');
var activityMapper = require('../controllers/mappers/ApiActivityMapper');

module.exports = function() {

  var HipchatController = {};

  HipchatController.incomingMessage = function(request, reply){
      reply().code(200)
      console.log(request.payload);
      var activity = activityMapper.Hipchat(request.payload);
      console.log(activity);
      request.server.plugins.hapio.io.emit('hipchat' , activity);
  }

  return HipchatController;

}
