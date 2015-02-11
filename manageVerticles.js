var eventBus = require("vertx/event_bus");
var console = require("vertx/console");
var container = require('vertx/container');
var vertx = require("vertx")

var server = vertx.createNetServer();

server.connectHandler(function(socket) {
  console.log("A client has connected!");
  eventBus.registerHandler("write.to.socket",function(message){
    socket.write(message + "\n")
  });
  eventBus.registerHandler("verticle.groovy.deploy",function(message){
    container.deployVerticle('boardVerticle.groovy');
    socket.write("boardVerticle.groovy deployed\n")
  });
  eventBus.registerHandler("verticle.groovy.undeploy",function(message){
    container.undeployVerticle('boardVerticle.groovy');
    socket.write("boardVerticle.groovy undeployed\n")
  });
  socket.dataHandler(function(buffer){
    executeCommand(buffer.toString());
  });
});

var executeCommand = function(command) {
  switch(true){
    case /deploy/.test(command):
      eventBus.send('verticle.groovy.deploy', command);
      break;
    case /undeploy/.test(command):
      eventBus.send('verticle.groovy.undeploy', command);
      break;
    default:
      socket.write("Command not found...")
  }
}

server.listen(1234, "localhost");
