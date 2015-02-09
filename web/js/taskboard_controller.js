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
