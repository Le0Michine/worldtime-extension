import * as Redux from "redux";

export interface Action<T> extends Redux.Action {
  payload: T;
}