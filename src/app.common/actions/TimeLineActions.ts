import { ActionCreator } from "react-redux";
import { Action } from "./Action";
import { TimeZoneInfo, createTimeZoneInfo } from "../models";

export function addTimeLine(timeLine: TimeZoneInfo): Action<TimeZoneInfo> {
  return {
    type: "ADD_TIMELINE",
    payload: timeLine
  };
}

export function createOrUpdateTimeLine({id, name, timeZoneName, timeZoneOffset, preventDefault}) {
  let newTimeZoneInfo = createTimeZoneInfo(name, timeZoneName, +timeZoneOffset);
  return {
    type: "CREATE_OR_UPDATE",
    payload: Object.assign(newTimeZoneInfo, { id: id || newTimeZoneInfo.id })
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