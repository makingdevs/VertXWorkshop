'use strict';

var TaskboardView = (function() {

  var tasksTemplateSelector = "#tasks-template";
  var tasksDoneSelector = '#todo-tasks-list';

  var render = function(tasks){
    var source = $(tasksTemplateSelector).html();
    var template = Handlebars.compile(source);
    var html = template(tasks);
    $(tasksDoneSelector).html(html);
  };

  return {
    render: render
  };

}());
