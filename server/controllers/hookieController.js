var twilio = require('twilio');

module.exports = function() {

  var HookieController = {};

  HookieController.initPageAndTwilio = function (request, reply) {
    var capability = new twilio.Capability(
      'AC7375df61200f8bcd4d9458401254b9c6',
      '64a0b6a1cab9855b809819b746bb32a1'
    );
    capability.allowClientIncoming('Luis');

    var tokenTwilio = capability.generate();
    reply.view('index', { token: tokenTwilio });
  };

  return HookieController;

}
