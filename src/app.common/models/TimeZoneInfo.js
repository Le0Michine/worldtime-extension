export class TimeZoneInfo {
    name;
    timeZoneName;
    timeZoneOffset;
    relativeTimeZoneOffset;
    hours;

    constructor(name, timeZoneName, timeZoneOffset) {
        timeZoneOffset = Math.abs(timeZoneOffset) < 60 ? timeZoneOffset * 60 : timeZoneOffset;
        const currentTimeZoneOffset = -new Date(Date.now()).getTimezoneOffset();
        this.name = name;
        this.timeZoneName = timeZoneName;
        this.timeZoneOffset = timeZoneOffset;
        this.relativeTimeZoneOffset = (timeZoneOffset - currentTimeZoneOffset) / 60;
        this.hours = TimeZoneInfo.getHoursWithOffset(this.relativeTimeZoneOffset);
    }

    static getHoursWithOffset(offset) {
      return Array(24).fill(1).map((v, i) => {
        var h = i + offset;
        if (h < 0) {
          h += 24;
        } else if (h >= 24) {
          h -= 24;
        }
        return h;
      });
  }
}