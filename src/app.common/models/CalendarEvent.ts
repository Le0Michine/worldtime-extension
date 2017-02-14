import * as moment from "moment";
import "moment-timezone";

import { TimeSpanInfo } from "./TimeSpanInfo";

export class CalendarEvent {
  static exportToICS(timeSpan: TimeSpanInfo, location: string) {
    const startTime = moment().hours(timeSpan.startHour).minutes(timeSpan.startMinute).seconds(0);
    const endTime = moment().hours(timeSpan.endHour).minutes(timeSpan.endMinute).seconds(0);
    const mail = "me@gmail.com";
    console.log(timeSpan, startTime.toISOString(), endTime.toISOString(), location);
    const formatString = "YYYYMMDDTHHmmss[Z]";
    const icsMSG =
      `BEGIN:VCALENDAR\n` +
      `VERSION:2.0\n` +
      `PRODID:-//Worldtime//NONSGML v1.0//EN\n` +
      `BEGIN:VEVENT\n` +
      `UID:${mail}\n` +
      // `DTSTAMP:${moment().toISOString()}\n` +
      `DTSTAMP:${moment().utc().format(formatString)}\n` +
      // `ATTENDEE;CN=My Self ;RSVP=TRUE:MAILTO:${mail}\n` +
      // `ORGANIZER;CN=Me:MAILTO::${mail}\n` +
      // `DTSTART:${startTime.toISOString()}\n` +
      `DTSTART:${startTime.utc().format(formatString)}\n` +
      // `DTSTART:${"20170214T123000Z"}\n` +
      // `DTEND:${endTime.toISOString()}\n` +
      `DTEND:${endTime.utc().format(formatString)}\n` +
      // `DTEND:${"20170214T153000Z"}\n` +
      `LOCATION:${location}\n` +
      `SUMMARY:Our Meeting Office\n` +
      `END:VEVENT\n` +
      `END:VCALENDAR`;

     window.open(`data:text/calendar;charset=utf8,${encodeURI(icsMSG)}`);
  }

  static copyToClipboard(timeSpan: TimeSpanInfo, location: string) {
    let copyFrom = document.createElement("textarea");
    copyFrom.textContent = "copy content";
    document.body.appendChild(copyFrom);
    copyFrom.focus();
    document.execCommand('SelectAll');
    document.execCommand('Copy');
    document.execCommand("copy");
    document.body.removeChild(copyFrom);
  }
}