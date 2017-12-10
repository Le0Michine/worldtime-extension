import { Action } from "../actions";
import { AppTheme, ScrollPosition } from "../models";
import { getColorById } from "../themes/themes";
import { updateState } from "./UpdateStateHelper";

export type State = ScrollPosition;

export const initialState: State = {
  maxLimit: 23,
  minLimit: -23,
  position: 0,
  step: 6,
};

export const reducer = function (state: State = initialState, action: Action<any>): State {
  switch (action.type) {
    case "SCROLL_POSITION/RESET":
      return updateState(state, { position: 0 });
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