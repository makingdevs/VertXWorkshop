'use strict';

var DoneListView = (function() {

  var tasksTemplateSelector = "#tasks-template";
  var doneTasksSelector = '#done-tasks-list';

  var render = function(tasks){
    var filterDoneTask = tasks.filter(function(task) {
      return task.status === "DONE";
    });

    var source = $(tasksTemplateSelector).html();
    var template = Handlebars.compile(source);
    var html = template(filterDoneTask);
    $(doneTasksSelector).html(html);
  };

  return {
    render: render
  };
}());
