var React = require('react');
var Dispatcher = require('./components/Dispatcher');
var Websocket = require('react-websocket');

var MainSection = require('./components/MainSection.react');

var Example = React.createClass({
    getInitialState: function() {
        return {
            planet: {id: 62, name: "Onderon"}
        }
    },

    handleData: function(data) {
        // do something with the data
        this.setState(
            {
                planet: data
            }
        );
        Dispatcher.handleViewAction({
            type: 'planet',
            planet: data
        });
    },

    render: function() {
        return (
        <div>
            <Websocket url="ws://localhost:4000/messages" onMessage={this.handleData} />
            <MainSection />
        </div>
);
}
});

React.render(
<Example />,
document.getElementById('root')
);