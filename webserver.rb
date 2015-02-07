require "vertx"

#server = HttpServer.new
#server.request_handler { |req| req.response.send_file("index.html") if req.uri == "/"}
#server.listen(8080)

web_server_conf = {
  'port' => 8000,
  'host' => 'localhost',
  'bridge' => '/eventbus'
}

server.listen(8080)

Vertx.deploy_module('io.vertx~mod-web-server~2.0.0-final', web_server_conf)
Vertx.deploy_verticle("list_verticle.groovy")
