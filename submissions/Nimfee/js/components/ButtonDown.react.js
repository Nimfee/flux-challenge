var React = require('react');
var Store = require('./Store');
var ActionCreator = require('./ActionCreator.react');
var Constants = require('../constants/Constants');

var ButtonDown = React.createClass({

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
  render: function() {
    var classDisabledName = Store.getButtonDownDisabled() ? 'css-button-down css-button-disabled' : 'css-button-down';

  	return (
        <button className={classDisabledName} disabled={Store.getButtonDownDisabled()} onClick={this._onClick} ></button>
);
},
_onClick: function() {
    Store.setButtonUpDisabled(true);
    Store.setButtonDownDisabled(true);
    var items = Store.getItems();
    for (var i=Constants.NUMBER_SITHS -1; i > -1; i--) {
        if (items[i].id != undefined && (i > 0)) {
            var apprentice_url = items[i].apprentice.url;
            items.splice(0, Constants.BUTTON_SHIFT);
            items.push({});
            items.push({});
            if (i < Constants.BUTTON_SHIFT) {
                Store.setButtonDownEndDisabled(true);
            }

            if (apprentice_url != null) {
                ActionCreator.getItems(apprentice_url, 'apprentice', Store);
                Store.setButtonDownEndDisabled(false);
            } else {

                Store.setButtonDownEndDisabled(true);
            }

            this.setState({
                items: Store.getItems().items,
                darth: Store.getDarth(),
                planet: Store.getPlanet(),
                buttonUp: true,
                buttonUDown: true
            });
            break;
        } else if (i <= Constants.BUTTON_SHIFT) {
            Store.setButtonDownEndDisabled(true);

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

module.exports = ButtonDown;
