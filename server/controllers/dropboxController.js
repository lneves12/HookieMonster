module.exports = function() {

  var DropboxController = {};

  DropboxController.challenge = function(request, reply){
    reply(request.query.challenge);
    console.log("Challenge Accepted:"  + request.query.challenge);
  }

  DropboxController.logStuff = function(request, reply){
    console.log("POST RECEIVED:"  + JSON.stringify(request.payload));
    request.server.plugins.hapio.io.emit('dropbox' , request.payload);
    //var app   = dbox.app({ "app_key": "umdez34678ck01fx", "app_secret": "tjm89017sci88o6" });
    //var client = app.client("TD3ZR66rFmsAAAAAAAAAkaCsLeYLGhE400e0Lctx3OniaKlLh__i7Cp_thDjO3Aj");



    //request('https://api.dropbox.com/' + request.payload.delta.users[0] + '/delta', function (error, response, body) {
    //https://api.dropbox.com/1/delta


    //client.delta(request.payload.delta.users[0], function(status, reply){
    //  console.log(reply);
    //});
  }

  DropboxController.emitRandomStuff = function(request, reply){
    reply("ok DropboxTEST").code(200).header('message', 'DropBox message');

    var activity = {source : "dropbox",
                    user :{
                      name: "userName",
                      img: "XXX"
                    },
                    message : "Testes de Interface",
                    img: "dropbox.jpg",
                    date: new Date(),
                    detail: {}
                    };
    console.log(activity);
    request.server.plugins.hapio.io.emit('dropbox' , activity);
  }

  return DropboxController;

}
