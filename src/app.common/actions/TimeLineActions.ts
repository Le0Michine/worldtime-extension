import { ActionCreator } from "react-redux";
import { Action } from "./Action";
import { TimeZoneInfo, createTimeZoneInfo } from "../models";
import * as moment from "moment-timezone";

export function createOrUpdateTimeLine(timeLine: TimeZoneInfo) {
  return {
    type: "CREATE_OR_UPDATE",
    payload: Object.assign({}, timeLine)
  };
}

export function removeTimeLine(timeLine: TimeZoneInfo): Action<TimeZoneInfo> {
  return {
    type: "DELETE_TIMELINE",
    payload: timeLine
  };
}

export function replaceTimeLines(timeLines: TimeZoneInfo[]): Action<TimeZoneInfo[]> {
  return {
    type: "REPLACE_TIMELINES",
    payload: timeLines
  };
}

export function swapTimeLines(timeLines: TimeZoneInfo[], i: number, j: number): Action<TimeZoneInfo[]> {
  const result =  [...timeLines]
  result[i] = timeLines[j];
  result[j] = timeLines[i];
  return replaceTimeLines(result);
}