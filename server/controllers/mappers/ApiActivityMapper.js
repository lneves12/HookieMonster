// Objectivo: Mapear todos os dados vindos de sources diferentes para a mesma estrutura para ser mostrada da mesma forma
module.exports = {
  Twilio: function (twilioReq) {
   return {'source' : 'twilio',
    'from' : twilioReq.From,
    'to' : twilioReq.Called ,
    'message' : twilioReq.CallStatus,
	   'duration' : twilioReq.CallDuration};
  },
  Hipchat: function (hipchatReq) {
    return {'source' : 'hipchat',
     'from' : hipchatReq.item.message.from.name,
     'to' : hipchatReq.Called ,
     'message' : hipchatReq.item.message.message,
 	   'duration' : hipchatReq.item.message.date};
  },
  Trello: function (trelloReq) {
    return {'source' : 'trello',
     'from' : trelloReq.action.memberCreator.username,
     'to' : trelloReq.model.name,
     'message' : trelloReq.action.type,
     'duration' : trelloReq.action.date};
  }
};
