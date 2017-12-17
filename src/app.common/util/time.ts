import * as moment from "moment";

export function formatTime(time: moment.Moment, use24HoursFormat: boolean): string {
    return moment(time).format(use24HoursFormat ? "HH:mm" : "h.mma");
}

export function fromatOffset(offset: number) {
    const absOffset = Math.abs(offset);
    const hours = Math.trunc(absOffset / 60);
    const minutes = absOffset % 60;
    const sign = offset < 0 ? "-" : "+";
    return `${sign}${hours >= 10 ? "" : "0" }${hours}:${minutes >= 10 ? "" : "0" }${minutes}`;
}

export function getTimeZoneAbbreviation(timeZoneId: string) {
    const abbreviation = moment.tz.zone(timeZoneId).abbr(moment().unix());
    return /^[^\d]*$/.test(abbreviation) ? abbreviation : "";
}