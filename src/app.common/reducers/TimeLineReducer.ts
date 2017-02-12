import { TimeZoneInfo } from "../models";
import { Action } from "../actions";

export const timeLines = function (state: TimeZoneInfo[] = [], action: Action<any>): TimeZoneInfo[] {
  console.log("timeLines", state, action);
  switch(action.type) {
    case "REPLACE_TIMELINES":
      return action.payload;
    case "ADD_TIMELINE": {
      const timeLines = [...state, action.payload];
      return timeLines;
    }
    case "EDIT_TIMELINE": {
      const i = state.findIndex(x => x.timeLineid === action.payload.timeLineid);
      const timeLines = i > -1 ? state.slice(0, i).concat([ action.payload ]).concat(state.slice(i + 1)) : state;
      return timeLines;
    }
    case "CREATE_OR_UPDATE": {
      const i = state.findIndex(x => x.timeLineid === action.payload.timeLineid);
      const timeLines = i > -1
        ? state.slice(0, i).concat([ action.payload ]).concat(state.slice(i + 1))
        : state.concat([action.payload]);
      return timeLines;
    }
    case "DELETE_TIMELINE": {
      console.info(action, state);
      const i = state.findIndex(x => x.timeLineid === action.payload.timeLineid);
      const timeLines = i > -1 ? state.slice(0, i).concat(state.slice(i + 1)) : state;
      return timeLines;
    }
    default:
      return state;
  }
};