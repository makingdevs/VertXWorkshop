'use strict';

var TaskFormController = (function() {

  var formSelector = '#task-form';
  var formDivSelector = null;
  var form = null;

  var start = function(){
    formDivSelector = $(formSelector);
    form = $(formSelector).find('form');
    bindEvents();
  };

  var bindEvents = function(){
    formDivSelector.on('submit', 'form', addOneTask);
  };

  var addOneTask = function(e){
    var task = {};
    $('form').find('input[type="text"], textarea').each(function() {
      task[this.name] = this.value;
    });
    TaskManager.create(task);
    form.trigger('reset');
    $('input[type="text"]').first().foucs();
    e.preventDefault();
  };

  return {
    start : start
  };
}());
