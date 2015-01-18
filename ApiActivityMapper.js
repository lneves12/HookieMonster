// Objectivo: Mapear todos os dados vindos de sources diferentes para a mesma estrutura para ser mostrada da mesma forma
module.exports = {
  Twilio: function (twilioReq) {
   return {'source' : 'twilio', 'from' : twilioReq.Called, 'to' : twilioReq.Called , 'message' : twilioReq.CallStatus};
  },
  Mail: function (gmailReq) {
   return {};
  }
};