import { TimeZoneInfo } from "../models";
import { Action } from "./Action";

export function clearForm(id: number): Action<TimeZoneInfo> {
  return {
    type: "EDIT_TIMELINE/CLEAR_FORM",
    payload: {
      timeZoneId: "",
      name: ""
    } as TimeZoneInfo
  }
}

export function startEdit(timeLine: TimeZoneInfo): Action<TimeZoneInfo> {
  return {
    type: "EDIT_TIMELINE/START",
    payload: timeLine
  };
}

export function changeDisplayName(name: string): Action<string> {
  return {
    type: "EDIT_TIMELINE/CHANGE_DISPLAY_NAME",
    payload: name
  };
}

export function changeTimezoneId(timeZone: string): Action<string> {
  return {
    type: "EDIT_TIMELINE/CHANGE_TIMEZONE_ID",
    payload: timeZone
  };
}