import * as moment from "moment";

export function formatTime(time: moment.Moment, use24HoursFormat: boolean): string {
    return moment(time).format(use24HoursFormat ? "HH:mm" : "h.mma");
}