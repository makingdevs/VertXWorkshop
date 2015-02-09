'use strict';

var TodoListView = (function() {

  var tasksTemplateSelector = "#tasks-template";
  var todoTasksSelector = '#todo-tasks-list';

  var render = function(tasks){
    var filterTodoTask = tasks.filter(function(task) {
      return task.status === "TODO";
    });

    var source = $(tasksTemplateSelector).html();
    var template = Handlebars.compile(source);
    var html = template(filterTodoTask);
    $(todoTasksSelector).html(html);
  };

  return {
    render: render
  };
}());
