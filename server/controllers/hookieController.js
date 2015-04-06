var HookieController = module.exports = {
    clients: [],
    addClient: function(socket) {
      HookieController.clients.push(socket);
    },
    removeClient: function(socket) {
      var index = HookieController.clients.indexOf(socket);
      if (index != -1) {
        HookieController.clients.splice(index, 1);
          console.info('Client gone (id=' + socket.id + ').');
      }
    }
}
