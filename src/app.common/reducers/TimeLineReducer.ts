import { TimeZoneInfo, createTimeZoneInfo } from "../models";
import { Action } from "../actions";

export type State = TimeZoneInfo[];

export const initialState: State = [
  createTimeZoneInfo("Europe/Warsaw", "Kraków"),
  createTimeZoneInfo("US/Pacific", "San Francisco"),
  createTimeZoneInfo("Europe/Moscow", "Saint Petersburg"),
  createTimeZoneInfo("Australia/Melbourne", "Melbourne"),
  createTimeZoneInfo("Asia/Calcutta", "India")
  // createTimeZoneInfo("Asia/Yekaterinburg", "Yekaterinburg")
];

export const reducer = function (state: State = initialState, action: Action<any>): State {
  switch (action.type) {
    case "REPLACE_TIMELINES":
      return action.payload;
    case "CREATE_OR_UPDATE": {
      if (!action.payload.timeLineid) {
        let sum: number = 1;
        state.map(x => x.timeLineid).forEach(x => sum += x);
        Object.assign(action.payload, { timeLineid: sum });
      }
      const i = state.findIndex(x => x.timeLineid === action.payload.timeLineid);
      const timeLines = i > -1
        ? state.slice(0, i).concat([action.payload]).concat(state.slice(i + 1))
        : state.concat([action.payload]);
      return timeLines;
    }
    case "DELETE_TIMELINE": {
      const i = state.findIndex(x => x.timeLineid === action.payload.timeLineid);
      const timeLines = i > -1 ? state.slice(0, i).concat(state.slice(i + 1)) : state;
      return timeLines;
    }
    default:
      return state;
  }
};