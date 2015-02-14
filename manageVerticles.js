var eventBus = require("vertx/event_bus");
var console = require("vertx/console");
var container = require('vertx/container');
var vertx = require("vertx")

var config = container.config;
var server = vertx.createNetServer();
var verticles = { deploymentIds: [] };

server.connectHandler(function(socket) {
  console.log("A client has connected!");
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
    verticles.deploymentIds.forEach(function(element, index, array){
      container.undeployVerticle(element);
      socket.write(element + " undeployed \n");
    });
    verticles.deploymentIds = [];
  });
  eventBus.registerHandler("verticle.groovy.list",function(message){
    socket.write("Listing verticles \n")
    verticles.deploymentIds.forEach(function(element, index, array){
      socket.write(element + "\n");
    });
  });
  eventBus.registerHandler("module.web.deploy",function(message){
    socket.write("Deploying web module \n");
    container.deployModule("io.vertx~mod-web-server~2.0.0-final", config.web, function(err, deploymentID){
      socket.write("Deploying web module, done! \n");
    });
  });
  eventBus.registerHandler("module.mongo.deploy",function(message){
    socket.write("Deploying mongo module \n");
    container.deployModule("io.vertx~mod-mongo-persistor~2.1.0", config.mongo, function(){
      socket.write("Deploying mongo module, done! \n");
    });
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
    case /shutdown/.test(command):
      eventBus.send('verticle.groovy.undeploy', command);
      break;
    case /list/.test(command):
      eventBus.send('verticle.groovy.list', command);
      break;
    case /web-module/.test(command):
      eventBus.send('module.web.deploy', command);
      break;
    case /mongo-module/.test(command):
      eventBus.send('module.mongo.deploy', command);
      break;
    default:
      eventBus.send('write.to.socket', "Command not found...");
  }
}

server.listen(1234, "localhost");
