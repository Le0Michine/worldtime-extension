export const newTimeLine = function (state = {}, action) {
  switch(action.type) {
    case "UPDATE_NAME":
      return Object.assign({}, state, { name: action.payload });
    case "UPDATE_TIMEZONENAME":
      return Object.assign({}, state, { timeZoneName: action.payload });
    case "UPDATE_TIMEZONEOFFSET":
      return Object.assign({}, state, { timeZoneOffset: action.payload });
    default:
      return state;
  }
};