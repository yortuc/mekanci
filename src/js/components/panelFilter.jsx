var React = require('react');
var EventsStore = require('../stores/EventsStore');
var ActionCreator = require('../actions/DataActionCreators');

var panelFilter = React.createClass({
  getInitialState: function() {
    return {
      //events: [],
      venues: [],
      filter: {
        tag: null,
        text: "",
        venueId: null
      }
    };
  },
  
  componentDidMount: function() {
  },

  componentDidUpdate: function(){
    var top = (window.innerHeight - $("#panelFilter").height())/2;
    $("#panelFilter").animate({top: top}, 800, function() {
      //callback
    });
  },

  filterByText: function(event){
    console.log(event.target.value);
    this.setState({filter: {text: event.target.value}});

    ActionCreator.filterEvents({text: event.target.value});
  },

  filterText: "",

  render: function() {
    
    var events = this.props.events;
    var venues = this.props.venues;

    return (
      <div id="panelFilter">
        
        <div className="section">
          <button className="active">konser</button>
          <button className="olaybadge">{EventsStore.getAll().length} olay</button>
        </div>

        <div className="section">
          <input type="text" value={this.state.filter.text} onChange={this.filterByText} placeholder="arama yapın..."/> 
        </div>

        <div className="section">
            { venues.map(function(venu){
              return <button>{venu}</button>
            }) }
        </div>

        <div className="section footer">
          mekancı © 2015
        </div>
      </div>
    );
  }
});

module.exports = panelFilter;

/*
<div className="section">
  <ul>
    { events.map(function(evt){
      return <li>{evt.event_name}</li>
    }) }
  </ul>
</div>

*/