import { TimeSpanInfo } from "../models";
import { Action } from "../actions";

export const selectedTimeSpan = function (state: TimeSpanInfo = {} as TimeSpanInfo, action: Action<any>): TimeSpanInfo {
  switch(action.type) {
    case "SELECTED_TIMESPAN/CHANGE_SELECTED_TIMESPAN": {
      const result = Object.assign({}, action.payload)
      return result;
    }
    case "SELECTED_TIMESPAN/CHANGE_START_TIME": {
      const result = Object.assign({}, state, { startHour: action.payload.hour, startMinute: action.payload.minute })
      return result;
    }
    case "SELECTED_TIMESPAN/CHANGE_START_HOUR": {
      const result = Object.assign({}, state, { startHour: action.payload })
      return result;
    }
    case "SELECTED_TIMESPAN/CHANGE_START_MINUTE": {
      const result = Object.assign({}, state, { startMinute: action.payload })
      return result;
    }
    case "SELECTED_TIMESPAN/CHANGE_END_TIME": {
      const result = Object.assign({}, state, { endHour: action.payload.hour, endMinute: action.payload.minute })
      return result;
    }
    case "SELECTED_TIMESPAN/CHANGE_END_HOUR": {
      const result = Object.assign({}, state, { endHour: action.payload })
      return result;
    }
    case "SELECTED_TIMESPAN/CHANGE_END_MINUTE": {
      const result = Object.assign({}, state, { endMinute: action.payload })
      return result;
    }
    default:
      return state;
  }
};