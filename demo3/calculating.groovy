def eb = vertx.eventBus()

vertx.deployVerticle("fibonacci.groovy") { res ->
//vertx.deployVerticle("fibonacci.groovy",[worker:true]) { res ->
  eb.send("com.makingdevs.fibonacci", 40)
  eb.send("com.makingdevs.fibonacci", 10)
}

eb.consumer("com.makingdevs.response", { message ->
  println "${message.body()}"
})
