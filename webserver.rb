require "vertx"
include Vertx

server = HttpServer.new

server.request_handler { |req|
  req.response.send_file("index.html") if req.uri == "/"
  req.response.send_file("bower_components/bower-sockjs-client/sockjs.js") if req.uri == "/sockjs.js"
  req.response.send_file("bower_components/vertxbus/vertxbus.js") if req.uri == "/vertxbus.js"
}

server.listen(8080)
