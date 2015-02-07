require "vertx"
include Vertx

server = HttpServer.new

server.request_handler { |req|
  req.response.send_file("index.html") if req.uri == "/"
  req.response.send_file("bower_components/bower-sockjs-client/sockjs.js") if req.uri == "/sockjs.js"
  req.response.send_file("bower_components/vertxbus/vertxbus.js") if req.uri == "/vertxbus.js"
}

sockJSServer = SockJSServer.new(server)
sockJSServer.bridge({'prefix' => '/eventbus'}, [], [])
server.listen(8080)

Vertx.deploy_verticle("list_verticle.groovy")
