'use strict';

var TaskboardController = (function() {

  var tasksTemplateSelector = "#tasks-template";
  var tasksDoneSelector = '#todo-tasks-list';

  var start = function(data) {
    bindEvents();
    render(data);
  };

  var bindEvents = function(){
    console.log("bindEvents");
  };

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
