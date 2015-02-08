'use strict';

var TaskboardController = (function() {

  var tasksTemplateSelector = "#tasks-template";
  var tasksDoneSelector = '#todo-tasks-list';

  var start = function(data) {
    bindEvents();
    TaskboardView.render(data);
  };

  var bindEvents = function(){
    $('form').on('submit', addTask);
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
