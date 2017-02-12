import { createStore, applyMiddleware, combineReducers, compose, Action, Reducer } from "redux";
import * as createLogger from "redux-logger";
import { reducer as formReducer } from "redux-form";
import * as persistState from "redux-localstorage";
import * as moment from "moment-timezone";

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
    createTimeZoneInfo("Europe/Warsaw", "Kraków"),
    createTimeZoneInfo("US/Pacific", "San Francisco"),
    createTimeZoneInfo("Europe/Moscow", "Saint Petersburg"),
    createTimeZoneInfo("Asia/Yekaterinburg", "Yekaterinburg")
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
  persistState("timeLines", { key: "timeLines1" }),
) as any;

export const store = createStore<AppState>(combineReducers<AppState>(reducers), initialState, enchancer);