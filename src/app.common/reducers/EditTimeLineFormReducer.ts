import { updateState } from "./UpdateStateHelper";
import { TimeZoneInfo } from "../models";
import { Action } from "../actions";

export type State = TimeZoneInfo;

export const initialState: State = {
  name: "",
  timeZoneId: ""
} as State;

export const reducer = function (state: State = initialState, action: Action<any>): State {
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
      return updateState(state, { name: "", timeZoneId: "" });
    }
    default:
      return state;
  }
};