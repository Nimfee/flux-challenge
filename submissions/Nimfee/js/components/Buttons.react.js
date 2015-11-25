var React = require('react');

var ButtonUp = require('./ButtonUp.react');
var ButtonDown = require('./ButtonDown.react');

var Buttons = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
/*
    var handleClickUp = this.createEventHandler();
    var handleClickDown = this.createEventHandler();

    handleClickUp.subscribe(Actions.shiftListDown);
    handleClickDown.subscribe(Actions.shiftListUp);*/
    return (
        <div className="css-scroll-buttons">
            <ButtonUp disabled={this.props.disabledUp} />
            <ButtonDown disabled={this.props.disabledDown} />
        </div>
    );
  }

});

module.exports = Buttons;
