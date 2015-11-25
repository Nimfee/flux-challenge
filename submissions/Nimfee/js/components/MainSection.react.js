
var React = require('react');
var Buttons = require('./Buttons.react');
var List = require('./List.react');
var Header = require('./Header.react');

var MainSection = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
        <div className="css-root">
      <Header />
          <section className="css-scrollable-list">
            <List siths={false} />
            <Buttons disabledUp={false} disabledDown={true} />
        </section>
        </div>
    );
  }

});

module.exports = MainSection;
