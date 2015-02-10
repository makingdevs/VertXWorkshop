def eventBus = vertx.eventBus
def data = [
  [uuid: UUID.randomUUID().toString().replace('-',''), title:"New title task",description:"New description task", status:'TODO'],
  [uuid: UUID.randomUUID().toString().replace('-',''), title:"New title task 2",description:"New description task", status:'WIP'],
  [uuid: UUID.randomUUID().toString().replace('-',''), title:"New title task 3",description:"New description task", status:'DONE']
]

eventBus.registerHandler("board.task.list") { message ->
  eventBus.send('vertx.board', [ "action": "find", "collection": 'tasks']) { messageBack ->
    message.reply messageBack.body.results
  }
}

eventBus.registerHandler("board.task.add") { message ->
  def document = [uuid: UUID.randomUUID().toString().replace('-',''), title:message.body.title, description: message.body.description, status:'TODO']
  eventBus.send('vertx.board', [ "action": "save", "collection": 'tasks', "document": document ]) { messageBack ->
    eventBus.publish("board.tasks.changed", null)
  }
}

eventBus.registerHandler("board.task.delete") { message ->
  data.removeAll { t -> t.uuid == message.body.uuid }
  eventBus.publish("board.tasks.changed", null)
}

eventBus.registerHandler("board.task.edit") { message ->
  def task = data.find { it.uuid == message.body.uuid }
  task.status = message.body.status.toUpperCase()
  eventBus.publish("board.tasks.changed", null)
}
