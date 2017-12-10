import { Action } from "../actions";
import { AppTheme } from "../models";
import { getColorById, initialPalette } from "../themes/themes";

export type State = AppTheme;

export const initialState: State = {
  palette: initialPalette,
};

export const reducer = function (state: State = initialState, action: Action<any>): State {
  switch (action.type) {
    case "THEME/SET_PRIMARY_COLOR":
      const newState = Object.assign({}, state);
      if (getColorById(action.payload)) {
        newState.palette.primary = action.payload;
      }
      return newState;
    case "THEME/SET_SECONDARY_COLOR": {
      const newState = Object.assign({}, state);
      if (getColorById(action.payload)) {
        newState.palette.secondary = action.payload;
      }
      return newState;
    }
    default:
      return state;
  }
};