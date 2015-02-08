function TaskManagerEditor(eventBus){
  this.eventBus = eventBus;
  this.data = null
}
TaskManagerEditor.prototype.findAll = function(callback){
  this.eventBus.send("board.task.list", {}, function(message) {
    self.data = message;
    callback();
  });
}
TaskManagerEditor.prototype.getData = function(){
  return this.data;
}
