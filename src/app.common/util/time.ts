import * as moment from "moment";

export function formatTime(time: moment.Moment, use24HoursFormat: boolean): string {
    return moment(time).format(use24HoursFormat ? "HH:mm" : "h.mma");
}

export function getTimeZoneAbbreviation(timeZoneId: string) {
    const abbreviation = moment.tz.zone(timeZoneId).abbr(moment().unix());
    return /^[^\d]*$/.test(abbreviation) ? abbreviation : "";
}