'use strict';

var Task = {
  id : 0,
  description : '',

  create : function(data) {
    return $.extend({}, this, data);
  }
}
