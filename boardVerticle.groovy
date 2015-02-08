def eventBus = vertx.eventBus

def data = [
  [title:"New title task",description:"New description task"],
  [title:"New title task 2",description:"New description task"],
  [title:"New title task 3",description:"New description task"]
]

eventBus.registerHandler("board.task.list") { message ->
  println "listing task"
  message.reply data
}

eventBus.registerHandler("board.task.add") { message ->
  println "adding a new task"
  data << [title:message.body.title, description: message.body.description]
  eventBus.publish("board.tasks.changed", null)
}

eventBus.registerHandler("board.task.delete") { message ->
  println "board delete task"
}

eventBus.registerHandler("board.task.edit") { message ->
  println "board task edited"
}
