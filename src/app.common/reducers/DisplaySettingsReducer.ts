import { DisplaySettingsInfo } from "../models";
import { Action } from "../actions";

export const displaySettings = function (state: DisplaySettingsInfo = {} as DisplaySettingsInfo, action: Action<any>): DisplaySettingsInfo {
  switch(action.type) {
    case "DISPLAY_SETTINGS/SHOW_DST":
      const result = Object.assign({}, state, { showDST: action.payload });
      return result;
    case "DISPLAY_SETTINGS/SHOW_UTC_OFFSET": {
      const result = Object.assign({}, state, { showUTCOffset: action.payload });
      return result;
    }
    case "DISPLAY_SETTINGS/SHOW_TIMEZONE_ID": {
      const result = Object.assign({}, state, { showTimeZoneId: action.payload });
      return result;
    }
    case "DISPLAY_SETTINGS/SHOW_SHOW_CONTROL_PANEL": {
      const result = Object.assign({}, state, { showControlPanel: action.payload });
      return result;
    }
    default:
      return state;
  }
};