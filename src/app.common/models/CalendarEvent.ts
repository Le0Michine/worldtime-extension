import * as moment from "moment";
import "moment-timezone";

import { TimeSpanInfo } from "./TimeSpanInfo";

export class CalendarEvent {
  static toCalendarEvent(timeSpan: TimeSpanInfo) {
    const startTime = moment().hours(timeSpan.startHour).minutes(timeSpan.startMinute);
    const endTime = moment().hours(timeSpan.endHour).minutes(timeSpan.endMinute);
    const location = moment().tz();
    const mail = "me@gmail.com";
    var icsMSG =
      `BEGIN:VCALENDAR` +
      `VERSION:2.0\n` +
      `PRODID:-//Worldtime//NONSGML v1.0//EN` +
      `BEGIN:VEVENT` +
      `UID:${mail}` +
      `DTSTAMP:${moment().format()}` +
      `ATTENDEE;CN=My Self ;RSVP=TRUE:MAILTO:${mail}` +
      `ORGANIZER;CN=Me:MAILTO::${mail}` +
      `DTSTART:${startTime.format()}` +
      `DTEND:${endTime.format()}` +
      `LOCATION:${location}` +
      `SUMMARY:Our Meeting Office` +
      `END:VEVENT` +
      `END:VCALENDAR`;

     window.open(`data:text/calendar;charset=utf8,${encodeURI(icsMSG)}`);
  }
}