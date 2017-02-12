import { ActionCreator } from "react-redux";
import { Action } from "./Action";
import { TimeZoneInfo, createTimeZoneInfo } from "../models";
import * as moment from "moment-timezone";

export function addTimeLine(timeLine: TimeZoneInfo): Action<TimeZoneInfo> {
  return {
    type: "ADD_TIMELINE",
    payload: timeLine
  };
}

export function createOrUpdateTimeLine(timeZoneId: string, name: string, timeLineId: number = undefined) {
  let newTimeZoneInfo = createTimeZoneInfo(timeZoneId, name);
  return {
    type: "CREATE_OR_UPDATE",
    payload: Object.assign(newTimeZoneInfo, { id: timeLineId || newTimeZoneInfo.timeLineid })
  };
}

export function removeTimeLine(timeLine: TimeZoneInfo): Action<TimeZoneInfo> {
  console.info("removeTimeLine", timeLine);
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

export function editTimeLine(timeLine: TimeZoneInfo): Action<TimeZoneInfo> {
  return {
    type: "EDIT_TIMELINE",
    payload: timeLine
  };
}