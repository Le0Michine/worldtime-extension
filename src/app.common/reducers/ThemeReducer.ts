import { Action } from "../actions";
import { AppTheme } from "../models";
import { getColorById } from "../themes/themes";

export const theme = function (state: AppTheme = {} as AppTheme, action: Action<any>): AppTheme {
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