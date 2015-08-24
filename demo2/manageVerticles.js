var Vertx = require("vertx-js/vertx");
var vertx = Vertx.vertx()
var eventBus = vertx.eventBus();

var server = vertx.createNetServer();
var verticles = { deploymentIds: [] };

server.connectHandler(function(socket) {
  console.log("A client has connected!");

  vertx.fileSystem().readFile('makingdevs.txt', function(result, error){
    socket.write(result);
  });

  eventBus.consumer("write.to.socket",function(message){
    socket.write(message.body() + "\n")
  });

  eventBus.consumer("verticle.deploy",function(message){
    var filesToDeploy = splitString(message.body(), ',');
    filesToDeploy.forEach(function(element, index, array){
      var elementToDeploy = element.trim();
      socket.write("Trying to deploy " + elementToDeploy + "\n");
      vertx.deployVerticle(elementToDeploy,function(deploymentId, error){
        if (!error) {
          socket.write(elementToDeploy + " has been deployed, deployment ID is " + deploymentId + "\n");
          verticles.deploymentIds.push(deploymentId);
        } else {
          socket.write("Deployment failed! " + error.getMessage());
        }
      });
    });
  });

  eventBus.consumer("verticle.undeploy",function(message){
    verticles.deploymentIds.forEach(function(element, index, array){
      vertx.undeploy(element);
      socket.write(element + " undeployed \n");
    });
    verticles.deploymentIds = [];
  });

  eventBus.consumer("verticle.list",function(message){
    socket.write("Listing verticles \n")
    verticles.deploymentIds.forEach(function(element, index, array){
      socket.write(element + "\n");
    });
  });

  socket.handler(function(buffer){
    executeCommand(buffer.toString("UTF-8"));
  });

});

var executeCommand = function(command) {
  var filesToApplyOperation = getVerticlesToApplyOperation(command)
  var commandToApply = getCommandToApply(command)
  switch(true){
    case /deploy/.test(commandToApply):
      eventBus.send('verticle.deploy', filesToApplyOperation);
      break;
    case /shutdown/.test(commandToApply):
      eventBus.send('verticle.undeploy', filesToApplyOperation);
      break;
    case /list/.test(commandToApply):
      eventBus.send('verticle.list', filesToApplyOperation);
      break;
    default:
      eventBus.send('write.to.socket', "Command not found...");
  }
}

var getVerticlesToApplyOperation = function(command){
  var separator = ' ';
  var commandInTokens = splitString(command, separator);
  var filesToDeploy = commandInTokens.slice(1).join(",");
  return filesToDeploy;
}

var getCommandToApply = function(command){
  return command.split(" ")[0];
}

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings;
}

server.listen(1234, "localhost");
