var twilio = require('twilio');
var client = new twilio.RestClient('ACdbb07ce91b29233eb1e9718e192f442b', '313b38a96a9708ad386e1331df9a2f47');

var promise = client.sendMessage({
    to:'+351918261154', 
    from:'+351308804107', 
    body:'Hookie...! Hookiie...!'
});


promise.then(function(call) {
    console.log('Call success! Call SID: '+call.sid);
}, function(error) {
    console.error('Call failed!  Reason: '+error.message);
});
