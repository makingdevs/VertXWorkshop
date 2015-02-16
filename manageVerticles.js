var eventBus = require("vertx/event_bus");
var console = require("vertx/console");
var container = require('vertx/container');
var vertx = require("vertx")

var config = container.config;
var server = vertx.createNetServer();
var verticles = { deploymentIds: [], webModuleId: null, mongoModuleId: null };

server.connectHandler(function(socket) {
  console.log("A client has connected!");

  vertx.fileSystem.readFile('makingdevs.txt', function(err, res){
    socket.write(res);
  });

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
    if(!verticles.webModuleId) {
      container.deployModule("io.vertx~mod-web-server~2.0.0-final", config.web, function(err, deploymentId){
        verticles.webModuleId = deploymentId;
        socket.write("Deploying web module, done! \n");
      });
    } else {
      socket.write("Already deployed a web module");
    }
  });
  eventBus.registerHandler("module.mongo.deploy",function(message){
    socket.write("Deploying mongo module \n");
    if(!verticles.mongoModuleId) {
      container.deployModule("io.vertx~mod-mongo-persistor~2.1.0", config.mongo, function(err, deploymentId){
        verticles.mongoModuleId = deploymentId;
        socket.write("Deploying mongo module, done! \n");
      });
    } else {
      socket.write("Already deployed a mongo module");
    }
  });
  eventBus.registerHandler("module.web.undeploy",function(message){
    if(verticles.webModuleId) {
      socket.write("Undeploying web module \n");
      container.undeployModule(verticles.webModuleId);
      verticles.webModuleId = null;
    } else {
      socket.write("There is not web module instance\n");
    }
  });
  eventBus.registerHandler("module.mongo.undeploy",function(message){
    if(verticles.mongoModuleId) {
      socket.write("Undeploying mongo module \n");
      container.undeployModule(verticles.mongoModuleId);
      verticles.mongoModuleId = null;
    } else {
      socket.write("There is not mongo module instance\n");
    }
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
    case /close-web/.test(command):
      eventBus.send('module.web.undeploy', command);
      break;
    case /close-mongo/.test(command):
      eventBus.send('module.mongo.undeploy', command);
      break;
    default:
      eventBus.send('write.to.socket', "Command not found...");
  }
}

server.listen(1234, "localhost");
