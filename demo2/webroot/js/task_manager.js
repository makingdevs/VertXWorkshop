'use strict';

var TaskManager = (function() {

  var eventBus = null;
  var data = null;

  var start = function(eventBus){
    this.eventBus = eventBus;
  };

  var getData = function(task){
    return this.data;
  };

  var create = function(task){
    this.eventBus.send("board.task.add", task);
  };

  var update = function(task){
    this.eventBus.send("board.task.edit", task);
  };

  var remove = function(taskUuid){
    this.eventBus.send("board.task.delete", { uuid:taskUuid });
  };

  var findAll = function(callback){
    this.eventBus.send("board.task.list", {}, function(message) {
      callback(message);
    });
  };

  return {
    start : start,
    getData : getData,
    create : create,
    update : update,
    remove : remove,
    findAll : findAll
  };

}());
