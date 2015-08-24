import io.vertx.groovy.ext.mongo.MongoClient

def eventBus = vertx.eventBus()
def config = vertx.currentContext().config()
def mongoClient = MongoClient.createShared(vertx, config)

eventBus.consumer("board.task.list") { message ->
  def query = [:]
  mongoClient.find('tasks', query) { mongoResponseFromOperation ->
    if(mongoResponseFromOperation.succeeded())
      message.reply mongoResponseFromOperation.result()
    else
      mongoResponseFromOperation.cause().printStackTrace()
  }
}

eventBus.consumer("board.task.add") { message ->
  def document = [
    uuid: UUID.randomUUID().toString().replace('-',''),
    title:message.body().title,
    description: message.body().description,
    status:'TODO']

  mongoClient.save('tasks', document) { mongoResponseFromOperation ->
    if(mongoResponseFromOperation.succeeded()){
      eventBus.publish("board.tasks.changed", null)
      message.reply mongoResponseFromOperation.result()
    }
    else
      mongoResponseFromOperation.cause().printStackTrace()
  }
}

eventBus.consumer("board.task.delete") { message ->
  def query = [
    uuid : message.body().uuid
  ]
  mongoClient.remove('tasks', query) { mongoResponseFromOperation ->
    if(mongoResponseFromOperation.succeeded())
      eventBus.publish("board.tasks.changed", null)
    else
      mongoResponseFromOperation.cause().printStackTrace()
  }
}

eventBus.consumer("board.task.edit") { message ->
  def query = [
    uuid: message.body().uuid
  ]
  def update = [
    '$set': [
      status: message.body().status.toUpperCase()
    ]
  ]

  mongoClient.update('tasks', query, update) { mongoResponseFromOperation ->
    if(mongoResponseFromOperation.succeeded())
      eventBus.publish("board.tasks.changed", null)
    else
      mongoResponseFromOperation.cause().printStackTrace()
  }
}
