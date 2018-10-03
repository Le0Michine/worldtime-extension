import * as moment from "moment-timezone";

export interface TimeZoneInfo {
    timeLineid: number;
    timeZoneId: string;
    name: string;
}

export interface HourDay {
  hour: number;
  dayOffset: number;
}

var tzId = 1;

export function createTimeZoneInfo(timeZoneId, name: string, timeLineid: number = undefined): TimeZoneInfo {
  const timeZoneInfo: TimeZoneInfo = { timeZoneId, timeLineid: timeLineid || tzId++, name } as TimeZoneInfo;
  return timeZoneInfo;
}

export function getHoursWithOffset(offset: number): HourDay[] {
  const relativeOffset = (offset - moment().utcOffset()) / 60;
  const toHourDayPair = (hours: number[], dayOffset: number): HourDay[] => hours.map(x => ({ hour: x, dayOffset }));
  const hours24 = Array(24).fill(1).map((x, i) => i);
  const result = [-1, 0, 1].map(dayOffset => toHourDayPair(hours24, dayOffset)).reduce((acc, x) => acc.concat(x), []);
  const startIndex = 24 + relativeOffset;
  return result.slice(startIndex, startIndex + 24);
};

export function getOffset(timeLine: TimeZoneInfo) {
  return moment().tz(timeLine.timeZoneId).utcOffset();
}

export function getRelativeOffset(timeLine: TimeZoneInfo) {
  return moment().tz(timeLine.timeZoneId).utcOffset() - moment().utcOffset();
}
