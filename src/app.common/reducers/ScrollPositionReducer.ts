import { Action } from "../actions";
import { AppTheme, ScrollPosition } from "../models";
import { getColorById } from "../themes/themes";
import { updateState } from "./UpdateStateHelper";

export const scrollPosition = function (state: ScrollPosition = {} as ScrollPosition, action: Action<any>): ScrollPosition {
  switch (action.type) {
    case "SCROLL_POSITION/SET":
      if (action.payload > state.maxLimit || action.payload < state.minLimit) {
        return state;
      } else {
        return updateState(state, { position: action.payload });
      }
    default:
      return state;
  }
};