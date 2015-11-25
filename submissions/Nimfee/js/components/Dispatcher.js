
'use strict';

var Flux = require('flux');
var assign = require('object-assign');

var Dispatcher = assign(new Flux.Dispatcher(), {

    handleViewAction: function (data) {
        this.dispatch(data);
    }

});

module.exports = Dispatcher;