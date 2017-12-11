import { ActionCreator } from "react-redux";
import { Action } from "./Action";
import { DisplaySettingsInfo, DSTSetting } from "../models";
import * as moment from "moment-timezone";

export function changeScrollPostion(position: number): Action<number> {
  return {
    type: "SCROLL_POSITION/SET",
    payload: position
  };
}

export function resetScrollPostion(): Action<number> {
  return {
    type: "SCROLL_POSITION/RESET",
    payload: 0
  };
}
