var DropboxController = function() {

var request = require('request');
var config = require('getconfig');
var querystring = require('querystring');
var fs = require('fs');
var activityMapper = require('./mappers/ApiActivityMapper');

var cursor = null;

module.exports = function() {
  var DropboxController = {};

  DropboxController.challenge = function(req, reply){
    reply(req.query.challenge);
    console.log("Challenge Accepted:"  + req.query.challenge);
  }

  DropboxController.getChanges = function(req, reply){
    console.log("POST RECEIVED:" + JSON.stringify(req.payload));
    doDropboxChainRequest(req);
  }

  var params = { include_media_info: true };
  dropboxPostRequest("/1/delta/latest_cursor", params, function(err, res, body) {
    if(err) {
      console.log(err + res);
      return;
    }
    var json = JSON.parse(body);
    cursor = json.cursor;
    console.log("Got cursor " + cursor);
  });

  return DropboxController;
}

var imageTypes = ["image/jpeg", "image/jpg", "image/gif", "image/png",
  "image/bmp", "image/x-windows-bmp"];

function doDropboxChainRequest(req) {
  var params = { cursor: cursor, include_media_info: true };
  dropboxPostRequest("/1/delta", params, function(err, res, body) {
    if(err) {
      console.error(err);
      return;
    }
    var json = JSON.parse(body);
    console.log(body);
    cursor = json.cursor;
    if(json.entries) {
      json.entries.forEach(function(elem, idx, array) {
        var path = elem[0];
        var metadata = elem[1];
        if(metadata == null) { // ficheiro apagado
          return;
        }
        if(imageTypes.indexOf(metadata.mime_type) == -1) {
          return;
        }
        var apiPath;
        if(metadata.thumb_exists) {
          apiPath = "/1/thumbnails/auto/" + encodeURIComponent(path) + "?size=xl";
        }
        else {
          apiPath = "/1/files/auto/" + encodeURIComponent(path);
        }
        var options = {
          url: "https://api-content.dropbox.com" + apiPath,
          headers: {
            'Authorization': 'Bearer ' + config.DropboxAuthToken
          }
        };

        request(options).pipe(fs.createWriteStream('public/images/dropbox/' + path.replace(/[\/\\]/g, '_')));
        var dropboxObject = {
          message: 'Changed picture',
          date: metadata.modified,
          path: path
        };
        if(metadata.modifier == null) {
          dropboxObject.user = "Owner";
        }
        else {
          dropboxObject.user = metadata.modifier.display_name;
        }
        var activity = activityMapper.Dropbox(dropboxObject);
        req.server.plugins.hapio.io.emit('dropbox', activity);
      });
    }

    if(json.hasMore) {
      doDropboxChainRequest(req);
    }
  });
}

function dropboxPostRequest(path, parameters, handler) {
  var options = {
    url: "https://api.dropbox.com" + path,
    headers: {
      'Authorization': 'Bearer ' + config.DropboxAuthToken
    },
    form: parameters
  };
  request.post(options, handler);
}


function getValidWebhookJSON(payload) {
  if(!payload.delta || !payload.delta.users) {
    console.error("Invalid JSON: ", postedObject);
    return null;
  }
  // TODO: Verificar que o HMAC-SHA256 do payload, criado com o app secret,
  // é igual à header X-Dropbox-Signature
  return postedObject;
}

function hasHttpError(res, msg) {
  if(res.statusCode != 200) {
    console.error((msg !== undefined ? msg : "") + res.statusCode + " " + res.statusMessage);
    return true;
  }
  return false;
}

}();
