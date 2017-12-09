import { ActionCreator } from "react-redux";
import { Action } from "./Action";
import { DisplaySettingsInfo, DSTSetting } from "../models";
import * as moment from "moment-timezone";

export function changePrimaryColor(colorName: string): Action<string> {
  return {
    type: "THEME/SET_PRIMARY_COLOR",
    payload: colorName
  };
}

export function changeSecondaryColor(colorName: string): Action<string> {
  return {
    type: "THEME/SET_SECONDARY_COLOR",
    payload: colorName
  };
}
