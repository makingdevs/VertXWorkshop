def eb = vertx.eventBus()

eb.consumer("com.makingdevs.fibonacci", { message ->
  def n = message.body().intValue()
  println("Calculating fibonacci of ${n}")
  def result = fibonacci(n)
  eb.send("com.makingdevs.response", result)
})

def fibonacci(n) { n < 2 ? 1 : fibonacci(n-1) + fibonacci(n-2) }

