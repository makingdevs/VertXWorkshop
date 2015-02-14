var eventBus = require("vertx/event_bus");
var console = require("vertx/console");
var container = require('vertx/container');
var vertx = require("vertx")

var config = container.config;
var server = vertx.createNetServer();
var verticles = { deploymentIds: [], webModuleId: null, mongoModuleId: null };

server.connectHandler(function(socket) {
  console.log("A client has connected!");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNDDDDDDDDDNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMMMMNNNDD8OOZZZZ$$$$ZZZOO88DDNNMMMMMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMNND8OZ$7I??+++======++??I7$ZO88DNNMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMNND8O$7I?+=D88888888888888888++?I$ZO8DNMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMND8O$7?+=88888888888888888888888888=+I$Z8DNNMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMNN8O$I+~8888888888888888888888888888888D=?7Z8DNMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMND8ZI+?888888888Z77IO8888....,77I7888888888$I$ODNMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMN8ZI=888888887I8888888888......... I7Z8888888?7ODNMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMNDO7+:88888I78888888888888.............II88888~?$8NMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8Z?~,88887888888888888888...............I8888:+7ODMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$?~,88887888888.~88=8888...===...===...78888:=7ODNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,88887888D+..88D.:=88...,777.,77:...78888:=IODNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,888878888Z88.8.88888....7+7.7:7....78888:=IODNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,888878888888D.788888....7+77I.7....78888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,88887888888.88..8888...I77.7II77...78888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,888878888878888DD888...............78888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,88887888888888888888...............78888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,88887888888888888888...............78888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,88887...............888888888888888I8888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,88887...............888888888888888I8888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMN8$+~,88887....=77777.....88888.D88.88888I8888:=IODNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMNN8$+~,88887.....77..II....88888.888Z8888878888:=IZDNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMNDO$+~,8888$.....77...77...8888Z=88887888878888:=IZ8NNMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMNND8Z7+~,88888I....77..:7=...88888.888Z8888788888:=IZO8DNNMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMNND8O77I+~,,8888I...=7777I7....88888.8887888878888Z:=?7$7O8DNMMMMMMMMMM\n");
  socket.write("MMMMMMMMMN8O$777+=~,.888887.............8888888888888788888,:~+?7I7Z8DNMMMMMMMMM\n");
  socket.write("MMMMMMMMNDO$I?77~7+,..888887............888888888888788888,,:~7=I7?7Z8NMMMMMMMMM\n");
  socket.write("MMMMMMMMN8Z7?7I~?7+,,..D88887...........88888888888788888:,,:~7I~77I$ODNMMMMMMMM\n");
  socket.write("MMMMMMMMN8ZI++77::77,,..88888Z7.........8888888887788888=.,,7I::77I?$ODNMMMMMMMM\n");
  socket.write("MMMMMMMMN8Z7+~?7?,7?:,,..D88888I+.......8888888O7888888,.,,=+7~+7I=?$ODNMMMMMMMM\n");
  socket.write("MMMMMMMMNDO$?=:7I+,+7:,...88888887=.....8888887888888D..,,,77,,II=+7Z8NMMMMMMMMM\n");
  socket.write("MMMMMMMMMN8Z7+=:777=7,7:,...8888888I7...888II8888888...,,I+7I777~+I$ODNMMMMMMMMM\n");
  socket.write("MMMMMMMMMND8$I+~:77:,77:I,...,8888888Z7=O778888888:..,,7:77,,77+=?7ODNMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMNDO$I+~:III=,I7~7,....8888888888888888...,,7,7I,:777~=?7Z8NMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMNDOZI+=~,,,I:I,77,I....$88888888888....+:77,+,?,,:~+I$ODNMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMND8Z7?=~=777,,I=?7?II....888888....7I,7I~7,,I77?=+I$O8NMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMND8O$I+=~:777I,,~.777,,,......,,,+77,=.,?777:~=?7Z8DNMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMNNDOZ7?+=~:,=I77,7~7I7=::::::~777~7,+77I::~=?I$O8DNMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMND8OZ7?+=~~:::777~=++??????+=~:?77+::~=+?I$O8DNMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMND8OZ$I?+==~~~=+?I$ZZOZZ$7?+=~~~~==+I7$O8DNNMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMNND8OZ$7I??II7$Z8DDDDD8OZ7II??II7$ZO8DNNMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMNNDD8OOZZZOO8DNNMMMNNDD8OZZZOO88DNNMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMMMMNNNDDDNNNMMMMMMMMMNNNDDDNNNNMMMMMMMMMMMMMMMMMMMMMMMMMM\n");
  socket.write("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\n");
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
