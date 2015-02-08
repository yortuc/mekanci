/*** @jsx React.DOM */

var React = require('react');
var EventsStore = require('../stores/EventsStore');
var ActionCreator = require('../actions/DataActionCreators');
var Event = require('../components/Event.jsx');
var Map = require('../components/Map.jsx');
var panelFilter = require('../components/panelFilter.jsx');
var panelDateSlider = require('../components/panelDateSlider.jsx');

var App = React.createClass({

  _onChange: function() {
    var data = EventsStore.getData();
    this.setState({ 
      events: data.events,
      venues: data.venues
    });
  },

  getInitialState: function() {
    return {
      events: [],
      venues: []
    }
  },

  componentWillMount: function(){
  },

  componentDidMount: function() {
    EventsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    EventsStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var events = this.state.events;
    console.log("app.state.events", events);

    return (
      <div id="appcontainer">
        <Map events={this.state.events} />
        <panelFilter events={this.state.events} venues={this.state.venues} />
        <panelDateSlider />
      </div>
    );
  }

});

module.exports = App;