'use strict';

var Task = {
  id : 0,
  title : '',
  description : '',
  status : 'TODO',

  create : function(data) {
    return $.extend({}, this, data);
  }
}
