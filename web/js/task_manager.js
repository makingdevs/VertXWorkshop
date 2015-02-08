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

  var read = function(task_id){
  };

  var update = function(task){
  };

  var eliminate = function(task){
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
    read : read,
    update : update,
    eliminate : eliminate,
    findAll : findAll
  };

}());
