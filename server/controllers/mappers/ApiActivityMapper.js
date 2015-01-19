// Objectivo: Mapear todos os dados vindos de sources diferentes para a mesma estrutura para ser mostrada da mesma forma
module.exports = {
  Twilio: function (twilioReq) {
   return {'source' : 'twilio',
    'from' : twilioReq.From,
    'to' : twilioReq.Called ,
    'message' : twilioReq.CallStatus,
	'duration' : twilioReq.CallDuration};
  },
  Mail: function (gmailReq) {
   return {};
  }
};
