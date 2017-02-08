import { Action } from "./Action";
import { TimeZoneInfo } from "../models";

export function updateName(name: string): Action<string> {
  return {
    type: "UPDATE_NAME",
    payload: name
  };
}

export function updateTimeZoneName(name: string): Action<string> {
  return {
    type: "UPDATE_TIMEZONENAME",
    payload: name
  };
}

export function updateTimeZoneOffset(offset: number): Action<number> {
  return {
    type: "UPDATE_TIMEZONEOFFSET",
    payload: offset
  };
}

export function selectTimeLine(timeLine: TimeZoneInfo): Action<TimeZoneInfo> {
  return {
    type: "EDIT/SELECT",
    payload: timeLine
  };
}