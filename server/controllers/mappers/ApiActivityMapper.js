// Objectivo: Mapear todos os dados vindos de sources diferentes para a mesma estrutura para ser mostrada da mesma forma
var trelloMapper = require('./trelloMapper')();
var hookieController = require('../hookieController');

module.exports = {
  TwilioPhone: function (twilioReq) {
   return {'source' : 'twilio',
    'user' : {name : twilioReq.From},
    'message' : twilioReq.CallStatus,
	  'date' : Date.now(),
    'img' : 'twilio.jpg',
    'detail' : {
      'callSid' : twilioReq.CallSid
    }
    };
  },
  TwilioClient: function (twilioReq) {
   return {'source' : 'twilio',
    'user' : {name : hookieController.clients[twilioReq.From.substring(7, twilioReq.From.length)].name},
    'message' : twilioReq.CallStatus,
    'date' : Date.now(),
    'img' : 'twilio.jpg',
    'detail' : {
      'fromMail': hookieController.clients[twilioReq.From.substring(7, twilioReq.From.length)].mail
    }
    };
  },
  Hipchat: function (hipchatReq, mail) {
    return {'source' : 'hipchat',
     'user' : {name : hipchatReq.item.message.from.name},
     'message' : hipchatReq.item.message.message.substring(8, hipchatReq.item.message.message.length),
     'date' : hipchatReq.item.message.date,
     'img' : 'hipchat.jpg',
     'detail' : {
       'message': hipchatReq.item.message.message.substring(8, hipchatReq.item.message.message.length),
       'fromMail': mail
     }
      };
  },
  Dropbox: function (dropboxReq) {
    return {'source' : 'dropbox',
     'user': {name: dropboxReq.user},
     'message': dropboxReq.message,
     'date': dropboxReq.date,
     'img': 'dropbox.jpg',
     'detail': {
        'image': 'images/dropbox/' + dropboxReq.flatPath,
        'imagePath': dropboxReq.path
      }
    };
  },
  Trello: function (trelloReq) {
    return trelloMapper.map(trelloReq);
 }
};
