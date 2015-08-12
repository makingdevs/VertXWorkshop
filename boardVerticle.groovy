import io.vertx.groovy.ext.mongo.MongoClient

def eventBus = vertx.eventBus()
def config = vertx.currentContext().config()
def mongoClient = MongoClient.createShared(vertx, config)

eventBus.consumer("board.task.list") { message ->
  println "board.task.list"
  def query = [:]
  mongoClient.find('tasks', query) { mongoResponseFromOperation ->
    if(mongoResponseFromOperation.succeeded())
      message.reply mongoResponseFromOperation.result()
    else
      mongoResponseFromOperation.cause().printStackTrace()
  }
}

eventBus.consumer("board.task.add") { message ->
  def query = [
    uuid: UUID.randomUUID().toString().replace('-',''),
    title:message.body.title,
    description: message.body.description,
    status:'TODO']

  mongoClient.save('tasks', query) { mongoResponseFromOperation ->
    if(mongoResponseFromOperation.succeeded())
      message.reply mongoResponseFromOperation.body.results
    else
      mongoResponseFromOperation.cause().printStackTrace()
  }
}

eventBus.consumer("board.task.delete") { message ->
  def query = [
    "action": "delete",
    "collection": "tasks",
    "matcher": [
      "uuid": "${message.body.uuid}"
    ]
  ]
  eventBus.send('vertx.board', query) { mongoResponseFromOperation ->
    eventBus.publish("board.tasks.changed", null)
  }
}

eventBus.consumer("board.task.edit") { message ->
  def query = [
    action: "update",
    collection: "tasks",
    criteria: [uuid: message.body.uuid],
    objNew: ['$set': [status: message.body.status.toUpperCase()]],
    upsert : false,
    multi: false
  ]

  eventBus.send('vertx.board', query) { mongoResponseFromOperation ->
    eventBus.publish("board.tasks.changed", null)
  }
}
