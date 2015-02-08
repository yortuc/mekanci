var React = require('react');

var Event = React.createClass({

  _marker: null,
  _infoWin: null,

  getInitialState: function() {
    return {};
  },

  componentWillMount: function(){

    var lat, 
        lng;

    if(!this._marker){
      lat = this.props.eventData.venue_latitude;
      lng = this.props.eventData.venue_longitude;

      this._marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat,lng),
          title: this.props.eventData.artist
      });

      this._marker.setAnimation(google.maps.Animation.DROP);
    }

    this._marker.setMap(this.props.map);
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function(){
    this._marker.setMap(null);
  },

  render: function() {
    return null;
  }
});

module.exports = Event;
