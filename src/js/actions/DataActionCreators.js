var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  getEvents: function(data) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.GET_EVENTS,
      dateMin: data.dateMin,
      dateMax: data.dateMax
    });
  },

  filterEvents: function(objFilter){
  	AppDispatcher.handleViewAction({
  		type: Constants.ActionTypes.FILTER_EVENTS,
  		filter: objFilter
  	});
  },

  filterEventsByDate: function(objDateFilter) {
    /*AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.FILTER_EVENTS_BY_DATE,
      filter: objDateFilter
    });*/
  }
};