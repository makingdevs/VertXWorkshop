function TaskManagerEditor(eventBus){
  this.eventBus = eventBus;
}
TaskManagerEditor.prototype.findAll = function(){
  var self = this;
  var data = null
  this.eventBus.send("board.task.list", {}, function(message) {
    data = message;
  });
  return data;
}
