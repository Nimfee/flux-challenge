var React = require('react');
var Store = require('./Store');

var Header = React.createClass({

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
   * @return {object}+
   */
  render: function() {
  	return (
        <h1 className="css-planet-monitor">Obi-Wan currently on {Store.getPlanet().name} </h1>
    );
  }

});

module.exports = Header;
