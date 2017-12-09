import { updateState } from "./UpdateStateHelper";
import { TimeZoneInfo } from "../models";
import { Action } from "../actions";

export const editTimeLineForm = function (state: TimeZoneInfo = {} as TimeZoneInfo, action: Action<any>): TimeZoneInfo {
  switch(action.type) {
    case "EDIT_TIMELINE/CHANGE_DISPLAY_NAME":
      return updateState(state, { name: action.payload })
    case "EDIT_TIMELINE/CHANGE_TIMEZONE_ID": {
      return updateState(state, { timeZoneId: action.payload })
    }
    case "EDIT_TIMELINE/START": {
      return updateState(state, action.payload);
    }
    case "EDIT_TIMELINE/CLEAR_FORM": {
      return action.payload;
    }
    default:
      return state;
  }
};