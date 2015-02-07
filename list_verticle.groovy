def eb = vertx.eventBus

eb.registerHandler("board.list") { message ->
  message.reply "This is a reply"
}
