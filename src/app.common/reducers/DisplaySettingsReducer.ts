import { updateState } from "./UpdateStateHelper";
import { DisplaySettingsInfo } from "../models";
import { Action } from "../actions";

export const displaySettings = function (state: DisplaySettingsInfo = {} as DisplaySettingsInfo, action: Action<any>): DisplaySettingsInfo {
  switch(action.type) {
    case "DISPLAY_SETTINGS/SHOW_DST":{
      return updateState(state, { showDST: action.payload });
    }
    case "DISPLAY_SETTINGS/SHOW_UTC_OFFSET": {
      return updateState(state, { showUTCOffset: action.payload });
    }
    case "DISPLAY_SETTINGS/SHOW_TIMEZONE_ID": {
      return updateState(state, { showTimeZoneId: action.payload });
    }
    case "DISPLAY_SETTINGS/SHOW_SHOW_CONTROL_PANEL": {
      return updateState(state, { showControlPanel: action.payload });
    }
    case "DISPLAY_SETTINGS/TOGGLE_DARK_THEME": {
      return updateState(state, { useDarkTheme: action.payload });
    }
    case "DISPLAY_SETTINGS/TOGGLE_24_HOURS": {
      return updateState(state, { use24HoursTime: action.payload });
    }
    default:
      return state;
  }
};