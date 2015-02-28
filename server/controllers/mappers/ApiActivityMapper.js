// Objectivo: Mapear todos os dados vindos de sources diferentes para a mesma estrutura para ser mostrada da mesma forma
module.exports = {
  Twilio: function (twilioReq) {
   return {'source' : 'twilio',
    'user' : {name : twilioReq.From},
    'message' : twilioReq.CallStatus,
	  'date' : twilioReq.CallDuration,
    'img' : 'twilio.jpg',
    'detail' : {}
     };
  },
  Hipchat: function (hipchatReq) {
    return {'source' : 'hipchat',
     'user' : {name : hipchatReq.item.message.from.name},
     'message' : hipchatReq.item.message.message,
     'date' : hipchatReq.item.message.date,
     'img' : 'hipchat.jpg',
     'detail' : {}
      };
  },
  Trello: function (trelloReq) {
    return {'source' : 'trello',
     'user' : {name : trelloReq.action.memberCreator.username},
     'message' : trelloReq.action.type,
     'date' : trelloReq.action.date,
     'img' : 'trello.jpg',
     'detail' : {}
   };
  }
};
