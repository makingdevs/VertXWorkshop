'use strict';

var TaskboardView = (function() {

  var tasksTemplateSelector = "#tasks-template";

  var render = function(tasks, taskRenderSelector){
    var source = $(tasksTemplateSelector).html();
    var template = Handlebars.compile(source);
    var html = template(tasks);
    $(taskRenderSelector).html(html);
  };

  return {
    render: render
  };

}());
