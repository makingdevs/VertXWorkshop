'use strict';

var TaskboardController = (function() {

  var tasksTemplateSelector = "#tasks-template";
  var todoTasksSelector = '#todo-tasks-list';
  var wipTasksSelector = '#wip-tasks-list';
  var doneTasksSelector = '#done-tasks-list';

  var start = function(data) {
    bindEvents();
    var todoList = data.filter(function(task) {
      return task.status === "TODO";
    });

    var wipList = data.filter(function(task) {
      return task.status === "WIP";
    });

    var doneList = data.filter(function(task) {
      return task.status === "DONE";
    });

    TaskboardView.render(todoList, todoTasksSelector);
    TaskboardView.render(wipList, wipTasksSelector);
    TaskboardView.render(doneList, doneTasksSelector);
  };

  var bindEvents = function(){
    $('form').on('submit', addTask);
    $('body').on('dragstart', '.draggable', drag);
    $('body').on('dragover', '.dropable', dragover);
    $('body').on('drop', '.dropable', drop);
  };

  var drop = function(ev) {
    var dataTransfer = ev.originalEvent.dataTransfer
    var uuid = dataTransfer.getData("text");
    var $currentTarget = $(ev.currentTarget);
    $currentTarget.append( $('#'+uuid) );

    TaskManager.update({
      uuid: uuid,
      status: $currentTarget.attr('id').split('-').shift()
    });
  };

  var dragover = function(ev) {
    ev.preventDefault();
  };

  var drag = function(ev) {
    var dataTransfer = ev.originalEvent.dataTransfer
    dataTransfer.setData("text", ev.target.id);
  };

  var addTask = function(e) {
    e.preventDefault();
    var task = {};
    $('form').find('input[type="text"], textarea').each(function() {
      task[this.name] = this.value;
    });
    TaskManager.create(task);
  }

  var render = function(tasks){
    var source = $(tasksTemplateSelector).html();
    var template = Handlebars.compile(source);
    var html = template(tasks);
    $(tasksDoneSelector).html(html);
  };

  return {
    start : start
  };

}());
