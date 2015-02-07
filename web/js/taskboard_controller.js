'use strict';

var TaskboardController = (function() {

  var start = function(options) {
    bindEvents();
  };

  var bindEvents = function(){
    console.log("bindEvents");
  };

  var add = function(task){
  };

  return {
    start : start
  };

}());
