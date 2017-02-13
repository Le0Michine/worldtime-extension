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