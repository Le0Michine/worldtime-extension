import * as moment from "moment";

export interface TimeZoneInfo {
    id: number;
    name: string;
    timeZoneName: string;
    timeZoneOffset: number;
    hours: number[];
}

let tzId = 1;

export function createTimeZoneInfo(name: string, timeZoneName: string, timeZoneOffset: number): TimeZoneInfo {
  // const currentTimeZoneOffset = moment().utcOffset();

  const timeZoneInfo = {
    id: tzId++,
    name,
    timeZoneName,
    timeZoneOffset,
    hours: getHoursWithOffset(timeZoneOffset)
  } as TimeZoneInfo;

  return timeZoneInfo;
}

function getHoursWithOffset(offset: number): number[] {
  const relativeOffset = (offset - moment().utcOffset()) / 60;
  let result = Array(24).fill(1).map((x, i) => i);
  result = [...result, ...result, ...result];
  const startIndex = 24 + relativeOffset;
  return result.slice(startIndex, startIndex + 24);
};