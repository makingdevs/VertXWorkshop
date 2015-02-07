def eb = vertx.eventBus

eb.registerHandler("board.list") { message ->
  message.reply("asldfjaslkdfj");
}
