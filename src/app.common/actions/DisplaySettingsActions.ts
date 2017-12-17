import { ActionCreator } from "react-redux";
import { Action } from "./Action";
import { DisplaySettingsInfo, DSTSetting } from "../models";
import * as moment from "moment-timezone";

export function changeShowDSTSetting(showDST: DSTSetting): Action<DSTSetting> {
  return {
    type: "DISPLAY_SETTINGS/SHOW_DST",
    payload: showDST
  };
}

export function changeShowUTCOffsetSetting(showUTCOffset: boolean): Action<boolean> {
  return {
    type: "DISPLAY_SETTINGS/SHOW_UTC_OFFSET",
    payload: showUTCOffset
  };
}

export function changeShowTimezoneIdSetting(showTZId: boolean): Action<boolean> {
  return {
    type: "DISPLAY_SETTINGS/SHOW_TIMEZONE_ID",
    payload: showTZId
  };
}

export function changeShowTimezoneAbbreviationSetting(showTZId: boolean): Action<boolean> {
  return {
    type: "DISPLAY_SETTINGS/SHOW_TIMEZONE_ABBREVIATION",
    payload: showTZId
  };
}

export function changeShowControlPanelSetting(ShowControlPanel: boolean): Action<boolean> {
  return {
    type: "DISPLAY_SETTINGS/SHOW_SHOW_CONTROL_PANEL",
    payload: ShowControlPanel
  };
}

export function changeDarkThemeSetting(useDarkTheme: boolean): Action<boolean> {
  return {
    type: "DISPLAY_SETTINGS/TOGGLE_DARK_THEME",
    payload: useDarkTheme
  };
}

export function change24HoursTimeFormatSetting(value: boolean): Action<boolean> {
  return {
    type: "DISPLAY_SETTINGS/TOGGLE_24_HOURS",
    payload: value
  };
}

export function changeTimeSelectionStepSetting(value: number): Action<number> {
  return {
    type: "DISPLAY_SETTINGS/CHANGE_TIME_SELECTION_STEP",
    payload: value
  };
}

export function changeShowDateLabelsSetting(value: boolean): Action<boolean> {
  return {
    type: "DISPLAY_SETTINGS/TOGGLE_SHOW_DATE_LABELS",
    payload: value
  };
}