import { Action } from "./Action";

export function changeScrollPostion(position: number): Action<number> {
  return {
    type: "SCROLL_POSITION/SET",
    payload: position
  };
}

export function resetScrollPostion(): Action<number> {
  return {
    type: "SCROLL_POSITION/RESET",
    payload: 0
  };
}
