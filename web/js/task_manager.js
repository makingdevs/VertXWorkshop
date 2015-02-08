'use strict';

var TaskManager = (function() {

  var eventBus = null;

  var start = function(_eventBus){
    eventBus = _eventBus;
    return this;
  };

  var create = function(task){
    console.log('create');
  };

  var read = function(task_id){
    console.log('read');
  };

  var update = function(task){
    console.log('update');
  };

  var eliminate = function(task){
    console.log('eliminate');
  };

  var list = function(){
    var data = null;
    console.log(eventBus);
    eventBus.onopen = function() {
      eventBus.send("board.task.list", {}, function(message) {
        console.log('Receiving message');
        console.log(message);
        data = message;
        return message;
      });
    };
    console.log("TaskManager: " + data);
    return data;
  };

  return {
    start : start,
    create : create,
    read : read,
    update : update,
    eliminate : eliminate,
    list : list
  };

}());
