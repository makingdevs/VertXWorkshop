'use strict';

var TaskbordApp = (function() {

  var eventBus = null;

  var start = function(){

    eventBus = new EventBus("http://localhost:8000/eventbus");
    eventBus.enableReconnect(true);
    console.log("Opening Eventbus...");
    eventBus.onopen = function() {
      console.log("The event bus is open");
      TaskManager.start(eventBus);
      TaskManager.findAll(function(tasks){
        TaskboardController.start(tasks);
      });
      TaskFormController.start();

      //eventBus.registerHandler("board.tasks.changed", function(err, message) {
      //  TaskManager.findAll(function(tasks){
      //    TodoListView.render(tasks);
      //    WipListView.render(tasks);
      //    DoneListView.render(tasks);
      //  });
      //})

      //eventBus.send("board.task.list", {}, function(error, message) {
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
