var React = require('react');
var ActionCreator = require('../actions/DataActionCreators');

var _aylar = ["ocak", "şubat", "mart","nisan", "mayıs", "haziran", "temmuz", "ağustos", "eylül", "ekim", "kasım", "aralık"];


function _getDateText(val){
  return val.getDate() + " " + _aylar[val.getMonth()];
}

function _dateText(date){
  return date.toISOString().split('T')[0].replace('-','').replace('-','');
}

var panelDateSlider = React.createClass({

  getDefaultProps: function() {
    return {
    };
  },

  getInitialState: function() {
    return {
      inited: false,
      bounds: {
        min: new Date(2015, 0, 1),
        max: new Date(2015, 4, 15)
      },
      val: {
        min: new Date(2015, 0, 20),
        max: new Date(2015, 0, 29)
      }
    }
  },

  componentDidMount: function() {
    var self = this;

    console.log("slider init", self.props);

    if(!this.state.inited){
      $("#panelDateSlider").dateRangeSlider({
        bounds: self.state.bounds,
        defaultValues: self.state.val,
        formatter:function(val){
          return _getDateText(val);
        }
      })
      .bind("valuesChanged", function(e, data){
        
        console.log("valuesChanged", data);

        self.setState({
          val :{ 
            min: data.values.min,
            max: data.values.max
          }
        });

        self._update(data);

      });
      this.setState({inited: true});
    }

    self._update();
  },

  _update: function (data){
    var self = this;

    console.log("slider change: ", data);

    var params = {
      dateMin: _dateText( self.state.val.min ),
      dateMax: _dateText( self.state.val.max )
    };

    //console.log("slider change: ", params);

    ActionCreator.getEvents(params);
    console.log("getEvents: : ", params);    
  },

  render: function() {
    return (
      <div id="panelDateSlider"></div>
    );
  }
});

module.exports = panelDateSlider;
