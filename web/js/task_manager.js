'use strict';

var TaskManager = {

  eventBus : null,

  start : function(_eventBus, data) {
    eventBus = _eventBus;
    return $.extend({}, this, data);
  },

  create : function(task){
    console.log('create');
  },

  read : function(task_id){
    console.log('read');
  },

  update : function(task){
    console.log('update');
  },

  eliminate : function(task){
    console.log('eliminate');
  },

  list : function(){
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
  }

}
