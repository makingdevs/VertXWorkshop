def eb = vertx.eventBus

eb.registerHandler("board.task.list") { message ->
  println "listing task"
  message.reply "done"
}

eb.registerHandler("board.task.add") { message ->
  println "adding new task"
  println message.body
}

eb.registerHandler("board.task.delete") { message ->
  println "board delete task"
}

eb.registerHandler("board.task.edit") { message ->
  println "board task edited"
}
