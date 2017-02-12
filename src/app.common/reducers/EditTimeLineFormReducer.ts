import { TimeZoneInfo } from "../models";
import { Action } from "../actions";

export const editTimeLineForm = function (state: TimeZoneInfo = {} as TimeZoneInfo, action: Action<any>): TimeZoneInfo {
  switch(action.type) {
    case "EDIT_TIMELINE/CHANGE_DISPLAY_NAME":
      const result = Object.assign({}, state, { name: action.payload })
      return result;
    case "EDIT_TIMELINE/CHANGE_TIMEZONE_ID": {
      const result = Object.assign({}, state, { timeZoneId: action.payload })
      return result;
    }
    case "EDIT_TIMELINE/START": {
      return Object.assign({}, action.payload);
    }
    case "EDIT_TIMELINE/CLEAR_FORM": {
      return action.payload;
    }
    default:
      return state;
  }
};