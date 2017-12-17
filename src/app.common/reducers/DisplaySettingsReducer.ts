import { Action } from "../actions";
import { DisplaySettingsInfo } from "../models";
import { BuildTargets, getBuildTarget } from "../util/target";
import { updateState } from "./UpdateStateHelper";

export type State = DisplaySettingsInfo;

export const initialState: State = {
    showDST: "hide",
    showTimeZoneId: false,
    showTimeZoneAbbreviation: true,
    showUTCOffset: true,
    showControlPanel: getBuildTarget() === BuildTargets.demo ? false : true,
    useDarkTheme: false,
    use24HoursTime: true,
    selectionStep: 30,
}

export const reducer = function (state: State = initialState, action: Action<any>): State {
  switch (action.type) {
    case "DISPLAY_SETTINGS/SHOW_DST": {
      return updateState(state, { showDST: action.payload });
    }
    case "DISPLAY_SETTINGS/SHOW_UTC_OFFSET": {
      return updateState(state, { showUTCOffset: action.payload });
    }
    case "DISPLAY_SETTINGS/SHOW_TIMEZONE_ID": {
      return updateState(state, { showTimeZoneId: action.payload });
    }
    case "DISPLAY_SETTINGS/SHOW_TIMEZONE_ABBREVIATION": {
      return updateState(state, { showTimeZoneAbbreviation: action.payload });
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
    case "DISPLAY_SETTINGS/CHANGE_TIME_SELECTION_STEP": {
      return updateState(state, { selectionStep: action.payload });
    }
    default:
      return state;
  }
};
