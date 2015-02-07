def eb = vertx.eventBus

eb.registerHandler("board.list") { message ->
  def data = [[:]]
  message.reply data
}
