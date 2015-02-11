def eventBus = vertx.eventBus

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
    document: [uuid: UUID.randomUUID().toString().replace('-',''),
    title:message.body.title,
    description: message.body.description,
    status:'TODO']
  ]
  eventBus.send('vertx.board', query) { messageBack ->
    eventBus.publish("board.tasks.changed", null)
  }
}

eventBus.registerHandler("board.task.delete") { message ->
  def query = [
    "action": "delete",
    "collection": "tasks",
    "matcher": [
      "uuid": "${message.body.uuid}"
    ]
  ]
  eventBus.send('vertx.board', query) { messageBack ->
    eventBus.publish("board.tasks.changed", null)
  }
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
