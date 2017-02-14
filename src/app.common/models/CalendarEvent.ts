import * as moment from "moment";
import "moment-timezone";

import { TimeSpanInfo, TimeZoneInfo } from "./";

function timeSpanToTime(timeSpan: TimeSpanInfo) {
    const startTime = moment().hours(timeSpan.startHour).minutes(timeSpan.startMinute).seconds(0);
    const endTime = moment().hours(timeSpan.endHour).minutes(timeSpan.endMinute).seconds(0);
    return {startTime, endTime};
}

function getEventDescription(timeSpan: TimeSpanInfo, timelines: TimeZoneInfo[], newLine: string = "\n") {
    const {startTime, endTime} = timeSpanToTime(timeSpan);
    const footer = `${newLine}${newLine}${newLine}Scheduled with worldtime extension${newLine}`;
    return timelines.map((tl: TimeZoneInfo) =>
      // `\n${tl.name}, ${tl.timeZoneId.replace("/", ", ").replace("_", " ")}\n` +
      `${newLine}${tl.name}${newLine}` +
      `${startTime.tz(tl.timeZoneId).format("h:mma\tddd, MMM D YYYY")}${newLine}` +
      `${endTime.tz(tl.timeZoneId).format("h:mma\tddd, MMM D YYYY")}`
    ).concat(footer).join(`${newLine}`);
}

export class CalendarEvent {
  static exportToICS(timeSpan: TimeSpanInfo, location: string, timelines: TimeZoneInfo[]) {
    const {startTime, endTime} = timeSpanToTime(timeSpan);
    const description = getEventDescription(timeSpan, timelines, "\\n");
    const formatString = "YYYYMMDDTHHmmss[Z]";
    const mail = "me@gmail.com";
    const icsMSG =
      `BEGIN:VCALENDAR\n` +
      `VERSION:2.0\n` +
      `PRODID:-//Worldtime//NONSGML v1.0//EN\n` +
      `BEGIN:VEVENT\n` +
      `DESCRIPTION:${description}\n` +
      `UID:worldtime\n` +
      `DTSTART:${startTime.utc().format(formatString)}\n` +
      `DTSTAMP:${moment().utc().format(formatString)}\n` +
      `DTEND:${endTime.utc().format(formatString)}\n` +
      // `ATTENDEE;CN=My Self ;RSVP=TRUE:MAILTO:${mail}\n` +
      // `ORGANIZER;CN=Me:MAILTO::${mail}\n` +
      `LOCATION:${location}\n` +
      `SUMMARY:Let's Meet\n` +
      `END:VEVENT\n` +
      `END:VCALENDAR`;

    window.open(`data:text/calendar;charset=utf8,${encodeURI(icsMSG)}`);
  }

  static getGoogleCalendarLink(timeSpan: TimeSpanInfo, location: string, timelines: TimeZoneInfo[]) {
    const {startTime, endTime} = timeSpanToTime(timeSpan);
    const description = getEventDescription(timeSpan, timelines);
    const formatString = "YYYYMMDDTHHmmss[Z]";
    const link = `http://www.google.com/calendar/event?action=TEMPLATE` +
      `&text=${"Let's Meet"}` +
      `&dates=${startTime.utc().format(formatString)}/${endTime.utc().format(formatString)}` +
      `&details=${description}` +
      `&location=${location}` +
      `&trp=true`;
    window.open(encodeURI(link));
  }

  static copyToClipboard(timeSpan: TimeSpanInfo, location: string, timelines: TimeZoneInfo[]) {
    const {startTime, endTime} = timeSpanToTime(timeSpan);
    const scheduleData = getEventDescription(timeSpan, timelines);

    let copyFrom = document.createElement("textarea");
    copyFrom.textContent = scheduleData;
    document.body.appendChild(copyFrom);
    copyFrom.focus();
    copyFrom.select();
    document.execCommand("copy");
    document.body.removeChild(copyFrom);
  }
}