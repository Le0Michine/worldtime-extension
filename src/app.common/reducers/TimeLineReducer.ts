import { TimeZoneInfo } from "../models";
import { Action } from "../actions";

export const timeLines = function (state: TimeZoneInfo[] = [], action: Action<any>): TimeZoneInfo[] {
  switch(action.type) {
    case "REPLACE_TIMELINES":
      return action.payload;
    case "CREATE_OR_UPDATE": {
      if (!action.payload.timeLineid) {
        let sum = 0;
        state.map(x => x.timeLineid).forEach(x => sum += x);
        Object.assign(action.payload, { timeLineid: sum })
      }
      const i = state.findIndex(x => x.timeLineid === action.payload.timeLineid);
      const timeLines = i > -1
        ? state.slice(0, i).concat([ action.payload ]).concat(state.slice(i + 1))
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