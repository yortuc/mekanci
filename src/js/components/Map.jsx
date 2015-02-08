var React = require('react');
var Event = require('../components/Event.jsx');

var _styles = {
  grayscale: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
  grayscale2: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
};

var Map = React.createClass({

  getInitialState: function() {
    return {
      map: null
    };
  },

  componentWillMount: function(){
  },

  componentDidMount: function() {
    
    if(this.state.map) return;  // map init edilmişse tekrar init etme

      var _map = new google.maps.Map(document.getElementById('map'),
         {
            center: new google.maps.LatLng( 41.028456, 28.996989 ),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            animation: google.maps.Animation.DROP,
            zoomControl: false,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL
            },
            panControl: false
         });
      //_map.setOptions({styles: _styles.grayscale});
      this.setState({map: _map});
  },

  render: function() {
    var events = this.state.map ? this.props.events : [];

    return (
      <div id="map">
        {events.map(function(ed) {
          return <Event eventData={ed} map={this.state.map} key={ed.id}/>;
        }.bind(this))}
      </div>
    );
  }
});

module.exports = Map;