/**
 * Created by aleks on 23.11.15.
 */
var Api = require('./API');
var Dispatcher = require('./Dispatcher');
var API_URL = 'http://localhost:3000/dark-jedis/3616';

// Define the ActionCreator.
var ActionCreator = {
    getItems: function (url, type, Store) {
        Api
            .get(url, type, Store)
            .then(function (item) {
                Dispatcher.handleViewAction({
                    type: type,
                    item: item
                });
            });
    },
    getDarth: function (Store) {
        Api
            .get(API_URL, '', Store)
            .then(function (darth) {
                Dispatcher.handleViewAction({
                    type: 'darth',
                    darth: darth
                });
            });
    }
};

module.exports = ActionCreator;