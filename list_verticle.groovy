def eb = vertx.eventBus
eb.registerHandler("board.list") { message ->
  println "I received a message ${message.body}"
}
