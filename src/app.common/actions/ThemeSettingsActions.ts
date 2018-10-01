import { Action } from "./Action";


export function changePrimaryColor(colorName: string): Action<string> {
  return {
    type: "THEME/SET_PRIMARY_COLOR",
    payload: colorName
  };
}

export function changeSecondaryColor(colorName: string): Action<string> {
  return {
    type: "THEME/SET_SECONDARY_COLOR",
    payload: colorName
  };
}
