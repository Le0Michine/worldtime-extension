import { TimeSpanInfo } from "../models";
import { Action } from "./Action";

export function changeStartTime(hour: number, minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_START_TIME",
    payload: { hour, minute }
  };
}

export function changeStartHour(hour: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_START_HOUR",
    payload: hour
  };
}

export function changeStartMinute(minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_START_MINUTE",
    payload: minute
  };
}

export function changeEndTime(hour: number, minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_END_TIME",
    payload: { hour, minute }
  };
}

export function changeEndHour(hour: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_END_HOUR",
    payload: hour
  };
}

export function changeEndMinute(minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_END_MINUTE",
    payload: minute
  };
}

export function changeSelectedTimeSpan(startHour: number, startMinute: number, endHour: number, endMinute: number): Action<TimeSpanInfo> {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_SELECTED_TIMESPAN",
    payload: { startHour, startMinute, endHour, endMinute }
  };
}