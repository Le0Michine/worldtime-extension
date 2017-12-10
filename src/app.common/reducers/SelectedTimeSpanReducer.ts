import { updateState } from "./UpdateStateHelper";
import { TimeSpanInfo } from "../models";
import { Action } from "../actions";
import * as moment from "moment";

export type State = TimeSpanInfo;

export const initialState: State = {
  startHour: moment().hours(),
  startMinute: moment().minutes(),
  endHour: 24,
  endMinute: 0
};

export const reducer = function (state: State = initialState, action: Action<any>): State {
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