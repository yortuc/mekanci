var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');
var deferred = require('deferred');
var _ = require('lodash');

var _data = {
  events: [],
  allEvents: [],
  venues: []
};

// add private functions to modify data
function updateEvents(arrEvents) {
  _data.allEvents = arrEvents;
  _data.events = arrEvents;

  computeVenues();
}

function filterEvents(objFilter){

  if(objFilter.text.length===0){
    _data.events = _data.allEvents;
    EventsStore.emitChange(_data);
    console.log("clear filter", _data.allEvents);
    return;
  }

  var filtered = [];
  for(var i=0; i<_data.allEvents.length; i++){
    var evt = _data.allEvents[i];
    var idx = evt.event_name.toLowerCase().indexOf(objFilter.text.toLowerCase());
    
    console.log(evt.event_name.toLowerCase(), objFilter.text.toLowerCase(), idx);

    if(idx > 0){
      filtered.push(evt);
    }
  }

  _data.events = filtered;
  console.log("filtered: ", filtered);

  computeVenues();
  EventsStore.emitChange(_data);
}

function filterEventsByDate(objDateFilter){
  _data.events = _.filter(_data.allEvents, function(evt) { 
                    return (new Date(evt.date) > objDateFilter.min 
                            && new Date(evt.date) < objFilter.max);
                  });
  console.log("filter events by date", objDateFilter, _data.events);
}

function computeVenues(){
  console.log("computeVenues");
  var arr = [];
  var venues = _.groupBy(_data.events, function(n) { 
    return n.venue_name;
  });
  for(var r in venues){
    arr.push(r);
  }
  _data.venues = arr;
}

var EventsStore = merge(EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return _data.events;
  },

  getData: function(){
    return _data;
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function(arrEvents) {
    this.emit(Constants.CHANGE_EVENT, arrEvents);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    console.log("events store payload", payload);

    switch(action.type) {
      case Constants.ActionTypes.GET_EVENTS:

        var root = "http://floating-bayou-4475.herokuapp.com/events/date/";
        var req_path = root+"start/"+action.dateMin+"/end/"+action.dateMax;

        console.log("req atıyorum: " + req_path );

        $.get(req_path, function(data) {

            var arrEvents = $.parseJSON(data);
            console.log("resp data: " , arrEvents);

            updateEvents(arrEvents);
            EventsStore.emitChange(_data);

        }.bind(this));

        break;

      case Constants.ActionTypes.FILTER_EVENTS: 
        
        console.log("FILTER_EVENTS", action.filter);

        filterEvents(action.filter);

        break;

      case Constants.ActionTypes.FILTER_EVENTS_BY_DATE:

        filterEventsByDate(action.filter);
        EventsStore.emitChange(_data.events);
        break;
    }
  })

});

module.exports = EventsStore;
