require 'vertx-web/router'
require 'vertx-web/static_handler'
require 'vertx-web/sock_js_handler'

server = $vertx.create_http_server()

router = VertxWeb::Router.router($vertx)

router.route("/static/*").handler(&VertxWeb::StaticHandler.create().method(:handle))

sockJSHandler = VertxWeb::SockJSHandler.create($vertx)

options = {
}
sockJSHandler.bridge(options)

router.route("/eventbus/*").handler(&sockJSHandler.method(:handle))

server.request_handler(&router.method(:accept)).listen(8080)


#web_server_conf = {
#  'port' => 8000,
#  'host' => 'localhost',
#  'bridge' => true,
#  "inbound_permitted" => [
#    { "address_re" => "board.task\\..+" }
#  ],
#  "outbound_permitted" => [
#    { "address" => "board.tasks.changed" }
#  ]
#}
#
mongo_persistor = {
  "host" => "localhost",
  "port" => 27017,
  "db_name" => "tasks",
  "useObjectId" => false
}
options = {
  "config" => mongo_persistor
}

#Vertx.deploy_module('io.vertx~mod-web-server~2.0.0-final', web_server_conf)
$vertx.deploy_verticle("boardVerticle.groovy", options)
