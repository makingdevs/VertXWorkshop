'use strict';

var TaskboardController = (function() {

  var tasksTemplateSelector = "#tasks-template";

  var start = function(data) {
    bindEvents();
    TodoListView.render(data);
    WipListView.render(data);
    DoneListView.render(data);
  };

  var bindEvents = function(){
    $('body').on('dragstart', '.draggable', drag);
    $('body').on('dragover', '.dropable', dragover);
    $('body').on('drop', '.dropable', drop);
    $('body').on('click', '.remove-task', removeTask);
  };

  var drop = function(ev) {
    var dataTransfer = ev.originalEvent.dataTransfer
    var uuid = dataTransfer.getData("text");
    var $currentTarget = $(ev.currentTarget);
    //$currentTarget.append( $('#'+uuid) ); // No es necesario!

    TaskManager.update({
      uuid: uuid,
      status: $currentTarget.attr('id').split('-').shift()
    });
  };

  var removeTask = function(e){
    var panelElement = $(e.target).parents('.panel')[0];
    var taskUuid = $(panelElement).attr('id');
    console.log(taskUuid);
    TaskManager.remove(taskUuid);
  }

  var dragover = function(ev) {
    ev.preventDefault();
  };

  var drag = function(ev) {
    var dataTransfer = ev.originalEvent.dataTransfer
    dataTransfer.setData("text", ev.target.id);
  };

  return {
    start : start
  };

}());
