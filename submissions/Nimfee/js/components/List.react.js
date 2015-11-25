/**
 * Created by aleks on 23.11.15.
 */
var React = require('react');
var AppDispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var ActionCreator = require('./ActionCreator.react');
var EmptyItem = require('./EmptyItem.react');
var assign = require('object-assign');

var _items = {};

var Store = require('./Store');

// Define the Category component.
var List = React.createClass({

    getInitialState: function () {
    ActionCreator.getDarth(Store);
    return {
        items: []
    };
},

componentWillMount: function () {
    Store.addChangeListener(this._onChange);
},

// Use the ActionCreator to get the categories.
componentDidMount: function () {

},

componentWillUnmount: function () {
    Store.removeChangeListener(this._onChange);
},

/**
 * Update the state of categories for this component.
 * This will get called when our store handles the response
 * from the action.
 */
_onChange: function () {
    this.setState({
        items: Store.getItems().items,
        darth: Store.getDarth(),
        planet: Store.getPlanet(),
        buttonUp: Store.getButtonUpDisabled(),
        buttonDown: Store.getButtonDownDisabled()

    });
},

// Display a drop-down containg the categories.
render: function () {
    var result = '';
    var planet = this.state.planet;
    var disableUp = Store.getButtonUpEndDisabled();
    var disableDown = Store.getButtonDownEndDisabled();
    Store.setRed(false);
    if (this.props.siths == false) {
        result = Store.getItems().map(function (item) {
            if (item.name) {
                var classItem = "css-slot";
                if (planet.id == item.homeworld.id) {
                    classItem = "css-slot css-red";
                    disableUp = true;
                    disableDown = true;
                    Store.setRed(true);
                }

                return <li className={ classItem }><h3> { item.name } </h3>
                <h6>Homeworld: { item.homeworld.name }</h6></li>;
            } else {
                return <EmptyItem />;
            }
        });

    }
    if (Store.getItems()[0].master != undefined && Store.getItems()[0].master.id == undefined) {
        disableUp = true;
    }
    if (Store.getItems()[4].apprentice != undefined && Store.getItems()[4].apprentice.id == undefined) {
        disableDown = true;
    }

Store.setButtonUpDisabled(disableUp);
Store.setButtonDownDisabled(disableDown);

return (
    <ul className="css-slots">
{ result }
</ul>
);
}
});

module.exports = List;