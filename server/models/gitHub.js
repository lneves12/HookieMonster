module.exports = function() {

  var GitHub = {};

  GitHub.helloWorld = function(name, callback) {
    callback(null, 'Hello ' + name);
  }

  return GitHub;
}
