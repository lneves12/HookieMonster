var HookieController = module.exports = {
    clients: {},
    addClient: function(socket, name, mail) {
      HookieController.clients[socket.id] = {};
      HookieController.clients[socket.id]['socket'] = socket;
      HookieController.clients[socket.id]['name'] = name;
      HookieController.clients[socket.id]['mail'] = mail;
    },
    removeClient: function(socket) {
      delete HookieController.clients[socket.id];
    }
}
