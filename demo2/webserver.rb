require 'vertx-web/router'
require 'vertx-web/static_handler'
require 'vertx-web/sock_js_handler'

server = $vertx.create_http_server()

router = VertxWeb::Router.router($vertx)

router.route("/static/*").handler(&VertxWeb::StaticHandler.create().set_caching_enabled(false).set_files_read_only(false).method(:handle))

options = {
  'inboundPermitteds' => [
    { "addressRegex" => "board.task\\..+" }
  ],
  'outboundPermitteds' => [
    { "address" => "board.tasks.changed" }
  ]
}

sockJSHandler = VertxWeb::SockJSHandler.create($vertx, options)

sockJSHandler.bridge(options)

router.route("/eventbus/*").handler(&sockJSHandler.method(:handle))

server.request_handler(&router.method(:accept)).listen(8000)

mongo_persistor = {
  "host" => "localhost",
  "port" => 27017,
  "db_name" => "tasks",
  "useObjectId" => false
}
options = {
  "config" => mongo_persistor
}

$vertx.deploy_verticle("boardVerticle.groovy", options)

