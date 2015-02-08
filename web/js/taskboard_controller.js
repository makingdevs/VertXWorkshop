'use strict';

var TaskboardController = (function() {

  var tasksTemplateSelector = "#tasks-template";

  var start = function() {
    bindEvents();
   render();
  };

  var bindEvents = function(){
    console.log("bindEvents");
  };

  var render = function(){
    var source = $(tasksTemplateSelector).html();
    var template = Handlebars.compile(source);
    var tasks = TaskManager.getData();
    console.log("TaskboardController");
    console.log(tasks);
    var html = template(tasks);
    console.log("html: " + html);
  };

  return {
    start : start
  };

}());
