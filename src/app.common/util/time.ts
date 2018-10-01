import * as moment from "moment-timezone";

export function formatTime(time: moment.Moment, use24HoursFormat: boolean, withSeconds: boolean = false): string {
    const seconds = withSeconds ? ":ss" : "";
    return moment(time).format(use24HoursFormat ? `HH:mm${seconds}` : `h:mm${seconds}a`);
}

export function fromatOffset(offset: number) {
    const absOffset = Math.abs(offset);
    const hours = Math.trunc(absOffset / 60);
    const minutes = absOffset % 60;
    const sign = offset < 0 ? "-" : "+";
    return `${sign}${hours >= 10 ? "" : "0" }${hours}:${minutes >= 10 ? "" : "0" }${minutes}`;
}

export function formatDate(daysOffset: number, hours: number) {
    return moment()
        .hour(hours)
        .minute(0)
        .second(0)
        .millisecond(0)
        .add(daysOffset, "days")
        .format("MMM D");
}

export function getTimeZoneAbbreviation(timeZoneId: string) {
    const abbreviation = moment.tz.zone(timeZoneId).abbr(moment().unix());
    return /^[^\d]*$/.test(abbreviation) ? abbreviation : "";
}