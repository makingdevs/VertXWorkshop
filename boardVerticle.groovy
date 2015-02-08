def eb = vertx.eventBus

eb.registerHandler("board.task.list") { message ->
  println "listing task"
  message.reply "done"
}

eb.registerHandler("board.task.add") { message ->
  def task = new Task(message.body)
  message.reply task.toMap()
}

eb.registerHandler("board.task.delete") { message ->
  println "board delete task"
}

eb.registerHandler("board.task.edit") { message ->
  println "board task edited"
}
