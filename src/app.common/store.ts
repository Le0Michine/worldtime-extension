import { createStore, applyMiddleware, combineReducers, compose, Action, Reducer } from "redux";
import * as createLogger from "redux-logger";
import { reducer as formReducer } from "redux-form";
import * as persistState from "redux-localstorage";

import { timeLines, newTimeLine } from "./reducers";
import { TimeZoneInfo, createTimeZoneInfo } from "../app.common/models";


export interface AppState {
  timeLines: TimeZoneInfo[];
  selectedTimeLineId: number;
}

export interface AppStoreDispatcher {
  timeLines: Reducer<TimeZoneInfo>;
  selectedTimeLineId: Reducer<number>;
  form: Reducer<any>;
}

const middleware = applyMiddleware(createLogger());
const initialState = {
  timeLines: [
    createTimeZoneInfo("Krakow", "CET", 1 * 60),
    createTimeZoneInfo("San Francisco", "PST", -8 * 60),
    createTimeZoneInfo("Saint Petersburg", "MSK", 3 * 60),
    createTimeZoneInfo("Yekaterinburg", "GMT+5", 5 * 60)
  ],
  selectedTimeLineId: null
};

const reducers = {
  timeLines,
  selectedTimeLineId: newTimeLine,
  form: formReducer
};

const enchancer = compose(
  middleware,
  persistState("timeLines", { key: "timeLines" }),
) as any;

export const store = createStore<AppState>(combineReducers<AppState>(reducers), initialState, enchancer);