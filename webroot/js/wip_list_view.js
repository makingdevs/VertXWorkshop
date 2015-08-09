'use strict';

var WipListView = (function() {

  var tasksTemplateSelector = "#tasks-template";
  var wipTasksSelector = '#wip-tasks-list';

  var render = function(tasks){
    var filterWipTask = tasks.filter(function(task) {
      return task.status === "WIP";
    });

    var source = $(tasksTemplateSelector).html();
    var template = Handlebars.compile(source);
    var html = template(filterWipTask);
    $(wipTasksSelector).html(html);
  };

  return {
    render: render
  };
}());
