require "vertx"
include Vertx

server = HttpServer.new

server.request_handler { |req| req.response.send_file("index.html") if req.uri == "/"}

server.listen(8080)
