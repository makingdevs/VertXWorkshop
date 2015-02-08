'use strict';

var TaskFormController = (function() {

  var formSelector = '#task-form';
  var formDivSelector = null;
  var form = null;
  var taskManager = null;

  var start = function(_taskManager){
    taskManager = _taskManager;
    formDivSelector = $(formSelector);
    form = $(formSelector).find('form');
    bindEvents();
  };

  var bindEvents = function(){
    formDivSelector.on('submit', 'form', addOneTask);
  };

  var addOneTask = function(e){
    console.log(form.serialize());
    taskManager.create({});
    form.trigger('reset');
    e.preventDefault();
  };

  return {
    start : start
  };
}());
