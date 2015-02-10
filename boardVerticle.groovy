def eventBus = vertx.eventBus
def data = [
  [uuid: UUID.randomUUID().toString().replace('-',''), title:"New title task",description:"New description task", status:'TODO'],
  [uuid: UUID.randomUUID().toString().replace('-',''), title:"New title task 2",description:"New description task", status:'WIP'],
  [uuid: UUID.randomUUID().toString().replace('-',''), title:"New title task 3",description:"New description task", status:'DONE']
]

eventBus.registerHandler("board.task.list") { message ->
  def query = [ action: "find", collection: "tasks" ]
  eventBus.send('vertx.board', query) { messageBack ->
    message.reply messageBack.body.results
  }
}

eventBus.registerHandler("board.task.add") { message ->
  def query = [
    action: "save",
    collection: "tasks",
    document: [uuid: UUID.randomUUID().toString().replace('-',''), title:message.body.title, description: message.body.description, status:'TODO']
  ]
  eventBus.send('vertx.board', ) { messageBack ->
    eventBus.publish("board.tasks.changed", null)
  }
}

eventBus.registerHandler("board.task.delete") { message ->
  data.removeAll { t -> t.uuid == message.body.uuid }
  eventBus.publish("board.tasks.changed", null)
}

eventBus.registerHandler("board.task.edit") { message ->
  def query = [
    action: "update",
    collection: "tasks",
    criteria: [uuid: message.body.uuid],
    objNew: ['$set': [status: message.body.status.toUpperCase()]],
    upsert : false,
    multi: false
  ]

  eventBus.send('vertx.board', query) { messageBack ->
    eventBus.publish("board.tasks.changed", null)
  }
}
