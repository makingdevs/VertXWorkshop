# Vert.X Workshop

## First demo

So, you want to try some features in Vert.x? Well, just go to folder _demo1_ and execute:

`vertx run sender.groovy`

After that, you have your first verticle up and running. Even though, is isolated and nothing could communicate with it.

Stop the execution, and after that in one terminal executes:

`vertx run sender.groovy -cluster`

In a second terminal execute:

`vertx run receiver.groovy -cluster`

After that, you must see both terminals doing 'ping pong' between them.

You can do the same with the Java files, in fact, without stop the previous commands execute the Java files in the same way.

**If you have some problems, then add the file _cluster.xm_ to your CLASSPATH, previously verifiying your local ip is in it.**

## Second demo

To this demo, you needs **MongoDB** up and running, also, **bower**  to download the resources(css and js).

Resuming the posible steps:

1. `bower update`
2. `mongod --dbpath ./data/db`

After that just execute:

`vertx run webserver.rb`

Be happy, uninstall IE, open a browser and navigate to "http://localhost:8000/static", enjoy!!!

### Extra demo

There's other file: _manageVerticle.js_, but this file needs a little more explanation because helps to manage all the verticles.
