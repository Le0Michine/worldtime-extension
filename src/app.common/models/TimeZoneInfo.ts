// import * as moment from "moment";
import * as moment from "moment-timezone";

export interface TimeZoneInfo {
    timeLineid: number;
    timeZoneId: string;
    name: string;
}

var tzId = 1;

export function createTimeZoneInfo(timeZoneId, name: string, timeLineid: number = undefined): TimeZoneInfo {
  const timeZoneInfo = { timeZoneId, timeLineid: timeLineid || tzId++, name } as TimeZoneInfo;
  return timeZoneInfo;
}

export function getHoursWithOffset(offset: number): number[] {
  const relativeOffset = (offset - moment().utcOffset()) / 60;
  let result = Array(24).fill(1).map((x, i) => i);
  result = [...result, ...result, ...result];
  const startIndex = 24 + relativeOffset;
  return result.slice(startIndex, startIndex + 24);
};

export function getOffset(timeLine: TimeZoneInfo) {
  return moment().tz(timeLine.timeZoneId).utcOffset();
}

export function getRelativeOffset(timeLine: TimeZoneInfo) {
  return moment().tz(timeLine.timeZoneId).utcOffset() - moment().utcOffset();
}
