var React = require('react');
var Store = require('./Store');
var ActionCreator = require('./ActionCreator.react');

var Constants = require('../constants/Constants');

var ButtonUp = React.createClass({

    componentWillMount: function () {
        Store.addChangeListener(this._onChange);
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
        planet: Store.getPlanet()
    });
},
  /**
   * @return {object}
   */
  render: function(){
    var classDisabledName = Store.getButtonUpDisabled() ? 'css-button-up css-button-disabled' : 'css-button-up';
    return (
        <button className={classDisabledName} disabled={Store.getButtonUpDisabled()} onClick={this._onClick} ></button>
);
},
_onClick: function() {
    Store.setButtonUpDisabled(true);
    Store.setButtonDownDisabled(true);
    var items = Store.getItems();
    for (var i=0; i< Constants.NUMBER_SITHS; i++) {
        if (items[i].id != undefined && (i < Constants.NUMBER_SITHS - 1)) {
            var master_url = items[i].master.url;
            items.splice(Constants.NUMBER_SITHS-Constants.BUTTON_SHIFT, Constants.NUMBER_SITHS - 1);
            items.unshift({});
            items.unshift({});
            if ( i > Constants.BUTTON_SHIFT ) {
                Store.setButtonUpEndDisabled(true);
            }

            if (master_url != null) {
                ActionCreator.getItems(master_url, 'master', Store);
                Store.setButtonUpEndDisabled(false);
            } else {

                Store.setButtonUpEndDisabled(true);
            }

            this.setState({
                items: Store.getItems().items,
                darth: Store.getDarth(),
                planet: Store.getPlanet(),
                buttonUp: true,
                buttonUDown: true
            });
            break;
        } else if (items[i].id != undefined && (i == Constants.NUMBER_SITHS - 1)) {
            Store.setButtonUpDisabled(true);

            this.setState({
                items: Store.getItems().items,
                darth: Store.getDarth(),
                planet: Store.getPlanet(),
                buttonUp: true,
                buttonUDown: true
            });
            break;
        }
    }
}

});

module.exports = ButtonUp;