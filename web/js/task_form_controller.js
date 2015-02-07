'use strict';

var TaskFormController = (function() {

  var formSelector = '#task-form';
  var formDivSelector = null;
  var form = null;

  var start = function(options){
    formDivSelector = $(formSelector);
    form = $(formSelector).find('form');
    bindEvents();
  };

  var bindEvents = function(){
    formDivSelector.on('submit', 'form', addOneTask);
  };

  var addOneTask = function(e){
    console.log(form.serialize());
    form.trigger('reset');
    e.preventDefault();
  };

  return {
    start : start
  };
}());
