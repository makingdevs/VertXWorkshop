require "vertx"

#server = HttpServer.new
#server.request_handler { |req| req.response.send_file("index.html") if req.uri == "/"}
#server.listen(8080)

web_server_conf = {
  'port' => 8000,
  'host' => 'localhost',
  'bridge' => true,
  "inbound_permitted" => [
    { "address_re" => "board.task\\..+" }
  ],
  "outbound_permitted" => [
    { "address" => "board.tasks.changed" }
  ]
}

mongo_persistor = {
  "address" => "vertx.board",
  "host" => "localhost",
  "port" => 27017,
  "pool_size" => 20,
  "db_name" => "tasks",
  "read_preference" => "nearest",
  "use_mongo_types" => false
}

Vertx.deploy_module('io.vertx~mod-web-server~2.0.0-final', web_server_conf)
Vertx.deploy_module('io.vertx~mod-mongo-persistor~2.1.0', mongo_persistor)
Vertx.deploy_verticle("boardVerticle.groovy")
