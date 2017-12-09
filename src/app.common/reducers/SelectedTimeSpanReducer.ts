import { updateState } from "./UpdateStateHelper";
import { TimeSpanInfo } from "../models";
import { Action } from "../actions";

export const selectedTimeSpan = function (state: TimeSpanInfo = {} as TimeSpanInfo, action: Action<any>): TimeSpanInfo {
  switch(action.type) {
    case "SELECTED_TIMESPAN/CHANGE_SELECTED_TIMESPAN": {
      return updateState(state, action.payload)
    }
    case "SELECTED_TIMESPAN/CHANGE_START_TIME": {
      return updateState(state, { startHour: action.payload.hour, startMinute: action.payload.minute })
    }
    case "SELECTED_TIMESPAN/CHANGE_START_HOUR": {
      return updateState(state, { startHour: action.payload })
    }
    case "SELECTED_TIMESPAN/CHANGE_START_MINUTE": {
      return updateState(state, { startMinute: action.payload })
    }
    case "SELECTED_TIMESPAN/CHANGE_END_TIME": {
      return updateState(state, { endHour: action.payload.hour, endMinute: action.payload.minute })
    }
    case "SELECTED_TIMESPAN/CHANGE_END_HOUR": {
      return updateState(state, { endHour: action.payload })
    }
    case "SELECTED_TIMESPAN/CHANGE_END_MINUTE": {
      return updateState(state, { endMinute: action.payload })
    }
    default:
      return state;
  }
};