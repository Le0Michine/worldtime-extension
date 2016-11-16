export class TimeZoneInfo {
    id;
    name;
    timeZoneName;
    timeZoneOffset;
    relativeTimeZoneOffset;
    hours;
}

var tzId = 1;

export function createTimeZoneInfo(name, timeZoneName, timeZoneOffset, id) {
  var timeZoneInfo = new TimeZoneInfo();
  timeZoneOffset = Math.abs(timeZoneOffset) < 60 ? timeZoneOffset * 60 : timeZoneOffset;
  const currentTimeZoneOffset = -new Date(Date.now()).getTimezoneOffset();

  timeZoneInfo.id = id || tzId++;
  timeZoneInfo.name = name;
  timeZoneInfo.timeZoneName = timeZoneName;
  timeZoneInfo.timeZoneOffset = timeZoneOffset / 60;
  timeZoneInfo.relativeTimeZoneOffset = (timeZoneOffset - currentTimeZoneOffset) / 60;
  timeZoneInfo.hours = getHoursWithOffset(timeZoneInfo.relativeTimeZoneOffset);

  return timeZoneInfo;
}

function getHoursWithOffset(offset) {
  return Array(24).fill(1).map((v, i) => {
    var h = i + offset;
    if (h < 0) {
      h += 24;
    } else if (h >= 24) {
      h -= 24;
    }
    return h;
  });
};