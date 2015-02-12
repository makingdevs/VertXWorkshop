var eventBus = require("vertx/event_bus");
var console = require("vertx/console");
var container = require('vertx/container');
var vertx = require("vertx")

var server = vertx.createNetServer();
var verticleIdentifiers = [];
var verticles = { deploymentIds: [] };

server.connectHandler(function(socket) {
  console.log("A client has connected!");
  console.log(verticleIdentifiers);
  eventBus.registerHandler("write.to.socket",function(message){
    socket.write(message + "\n")
  });
  eventBus.registerHandler("verticle.groovy.deploy",function(message){
    container.deployVerticle('boardVerticle.groovy',function(error, deploymentId){
      if (!error) {
        socket.write("The verticle has been deployed, deployment ID is " + deploymentId + "\n");
        verticles.deploymentIds.push(deploymentId);
      } else {
        socket.write("Deployment failed! " + error.getMessage());
      }
    });
    socket.write("boardVerticle.groovy deployed\n")
  });
  eventBus.registerHandler("verticle.groovy.undeploy",function(message){
    container.undeployVerticle(verticleId);
    socket.write("boardVerticle.groovy undeployed\n")
  });
  eventBus.registerHandler("verticle.groovy.list",function(message){
    socket.write("Listing verticles \n")
    socket.write(verticles.deploymentIds + "\n");
    socket.write("Listing verticles done \n")
    for(var i=0; i < verticleIdentifiers.length; i++)
      socket.write(verticleIdentifiers[i]);
    socket.write("All verticles \n")
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
    case /list/.test(command):
      eventBus.send('verticle.groovy.list', command);
      break;
    default:
      eventBus.send('write.to.socket', "Command not found...");
  }
}

server.listen(1234, "localhost");
