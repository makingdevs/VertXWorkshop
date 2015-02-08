'use strict';

var TaskbordApp = (function() {

  var eventBus = null;

  var start = function(){

    eventBus = new vertx.EventBus("http://localhost:8000/eventbus");
    eventBus.onopen = function() {
      console.log("The event bus is open");
      TaskManager.start(eventBus);
      TaskManager.findAll(function(tasks){
        TaskboardController.start(tasks);
      });

      //eventBus.registerHandler("board.tasks.changed", function(message) {
      //  eventBus.send("board.task.list", {}, function(message) {
      //    console.log("getting tasks because someone change it");
      //  })
      //})

      //eventBus.send("board.task.list", {}, function(message) {
      //  console.log(message);
      //});

      //eventBus.send("board.task.add", {
      //  title: "Título uno",
      //  description: "descripción"
      //});

    };

    eventBus.onclose = function() {
      console.log("close");
      eventBus = null;
    };
  };

  return {
    start : start
  }
}());


$(function initTaskboard(){
  TaskbordApp.start();
});
