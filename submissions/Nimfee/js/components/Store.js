var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionCreator = require('./ActionCreator.react');
var Constants = require('../constants/Constants');
var CHANGE_EVENT = 'change';
var _darth = {};
var _planet = {id: 62, name: "Onderon"};
var _buttonUp = false;
var _buttonDown = false;
var _buttonUpEnd = false;
var _buttonDownEnd = false;
var _initialize = true;
var _red = false;

var _items = [{},{},{},{},{}];

function setData (data) {
    switch (data.type ) {
        case 'master':
            for (var i=0; i < Constants.NUMBER_SITHS; i++) {
                if (_items[i].id != undefined && i != 0 && _items[i-1].id == undefined) {
                    _items[i-1] = data.item;
                    if (data.item.master.url != null && i - 1 > 0) {

                        ActionCreator.getItems(data.item.master.url, 'master', Store);
                        Store.setButtonUpEndDisabled(false);
                    } else if (data.item.master.url == null) {
                        Store.setButtonUpEndDisabled(true);
                    }
                    if (_items[Constants.NUMBER_SITHS-1].id  != undefined ){
                        Store.setButtonDownEndDisabled(_items[Constants.NUMBER_SITHS-1].apprentice.url != null ? false : true);
                    }

                    break;
                }
            }

            break;
        case 'apprentice':
             for (var i = (Constants.NUMBER_SITHS-1); i > -1; i--) {
                 if (_items[i].id != undefined && i != (Constants.NUMBER_SITHS-1) && _items[i+1].id == undefined) {
                     _items[i+1] = data.item;

                     if (data.item.apprentice.url != null && i + 1 < Constants.NUMBER_SITHS ) {
                         ActionCreator.getItems(data.item.apprentice.url, 'apprentice', Store);
                         Store.setButtonDownDisabled(false);
                         Store.setButtonDownEndDisabled(_items[i].master.url != null ? false : true);
                         break;


                     } else if (data.item.apprentice.url == null) {
                         Store.setButtonDownEndDisabled(true);

                     }
                 }
                 if (_items[i].id == undefined && i+1 < Constants.NUMBER_SITHS && _items[i+1].id != undefined) {
                     ActionCreator.getItems(_items[i+1].master.url, 'master', Store);
                     break;
                 }
            }

            break;
        case 'planet':
            _planet = data.planet;

            break;
        default:
            _items[Constants.DARTH_POSITION] = data.darth;
            _darth = data.darth;

            break;
    }
}

var Store = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getItems: function () {
        return _items;
    },

    getRequests: function () {
        return _requests;
    },

    addRequest: function (request) {
        return _requests.push(request);
    },

    getDarth: function () {
        if (_darth && _initialize && _darth.master != undefined && _darth.apprentice != undefined) {

            ActionCreator.getItems(_darth.master.url, 'master', Store);
            ActionCreator.getItems(_darth.apprentice.url, 'apprentice', Store);
            _initialize = false;
        }

        return _darth;
    },

    getPlanet: function () {
        return _planet;
    },

    getButtonUpDisabled: function () {
        return _buttonUp;
    },

    getButtonDownDisabled: function () {
        return _buttonDown;
    },

    setButtonUpDisabled: function (buttonUp) {
        _buttonUp = buttonUp;
    },

    setButtonDownDisabled: function (buttonDown) {
        _buttonDown = buttonDown;
    },

    setButtonUpEndDisabled: function (buttonUpEnd) {
        _buttonUpEnd = buttonUpEnd;
    },

    setButtonDownEndDisabled: function (buttonDownEnd) {
        _buttonDownEnd = buttonDownEnd;
    },

    getButtonUpEndDisabled: function () {
        return _buttonUpEnd;
    },

    getButtonDownEndDisabled: function () {
        return _buttonDownEnd;
    },

    getRed: function () {
        return _red;
    },

    setRed: function (red) {
        _red = red;
    }
});

// Store registers with dispatcher to handle actions.
Store.dispatchToken = Dispatcher.register(function (payload) {
    setData(payload);
    Store.emitChange();

    return true;
});

module.exports = Store;